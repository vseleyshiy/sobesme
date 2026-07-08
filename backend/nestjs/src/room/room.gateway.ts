import { JSONParse } from '@/libs/common/utils/json-parse.util';
import { PythonService } from '@/python/python.service';
import { RedisService } from '@/redis/redis.service';
import { AiResponseReadyDto } from '@/room/dto/ai-response-ready.dto';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { parse } from 'cookie';
import { signedCookie } from 'cookie-parser';
import type { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';
import type { IAuthenticatedSocket } from './types/authenticated-socket.type';
import { ISessionCookieParsed } from './types/session-cookie-parsed.type';

// TODO: оринжины как подхватить с configService?
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
  namespace: '/room',
})
export class RoomGateway implements OnGatewayConnection {
  public constructor(
    private readonly roomService: RoomService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly pythonService: PythonService,
  ) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      const cookies = client.handshake.headers.cookie;

      if (!cookies) throw new Error('В запросе нет заголовка cookie.');

      const parsedCookies = parse(cookies);

      const sessionId =
        parsedCookies[this.configService.getOrThrow<string>('SESSION_NAME')];

      if (!sessionId) throw new Error('В cookie нет поля с сессией.');

      const signedSessionId = signedCookie(
        sessionId,
        this.configService.getOrThrow<string>('SESSION_SECRET'),
      );

      if (!signedSessionId || signedSessionId === sessionId)
        throw new Error('Недействительная подпись cookie.');

      const redisSession = await this.redisService.get(
        this.configService.getOrThrow<string>('SESSION_FOLDER') +
          signedSessionId,
      );

      if (!redisSession) throw new Error('Сессия в Redis не найдена.');

      const parsedSession = JSONParse<ISessionCookieParsed>(redisSession);

      const userId = parsedSession.userId;

      (client as IAuthenticatedSocket).data.userId = userId;

      const interviewId = client.handshake.query.interviewId as string;

      if (!interviewId) throw new Error('В Query параметрах нет interviewId.');

      await this.roomService.validateInterviewAccess(userId, interviewId);

      await client.join(interviewId);

      (client as IAuthenticatedSocket).data.interviewId = interviewId;
    } catch (error) {
      console.log(error);
      client.disconnect(true);
    }
  }

  @SubscribeMessage('audio_chunk')
  handleAudioChunk(
    @ConnectedSocket() client: IAuthenticatedSocket,
    @MessageBody() chunk: Buffer,
  ) {
    const interviewId = client.data.interviewId;

    this.pythonService.sendAudioChunkToPython(interviewId, chunk);
  }

  @SubscribeMessage('audio_end')
  async handleAudioEnd(@ConnectedSocket() client: IAuthenticatedSocket) {
    try {
      const interviewId = client.data.interviewId;

      await this.pythonService.sendAudioEndToPython(interviewId);
    } catch (error) {
      console.log('Ошибка внутри audio_end: ', error);
    }
  }

  @OnEvent('ai.response.ready')
  handleAiResponseReady(payload: AiResponseReadyDto) {
    const { interviewId, text, impact, emotion, status, audioBuffer } = payload;

    this.server
      .to(interviewId)
      .emit('ai_response', { text, impact, emotion, status, audioBuffer });
  }

  // EVENTLOOP CYCLE
  // пользователь заходит на сайт, по url /room/:id (interview id)
  // на реакт происходит socket.connect() с помощью socket.io-client
  // и вот тут websocketgateway проверяет вот эту всю чепуху:
  // JWT токен, валидирует, что у юзера есть доступ к этому собесу, и добавляет его в "комнату" (socket.join).
}
