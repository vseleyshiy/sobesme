import { InterviewService } from '@/interview/interview.service';
import { MessageService } from '@/message/message.service';
import { PrismaService } from '@/prisma/prisma.service';
import { AiResponseDto } from '@/python/dto/ai-response.dto';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageRoleEnum } from 'prisma/__generated__/enums';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class PythonService implements OnModuleInit {
  private pythonSocket: Socket;
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly interviewService: InterviewService,
    private readonly messageService: MessageService,
    private readonly configService: ConfigService,
    private readonly eventEmmiter: EventEmitter2,
  ) {}
  onModuleInit() {
    this.pythonSocket = io(
      this.configService.getOrThrow<string>('FASTAPI_SERVER'),
      {
        transports: ['websocket'],
      },
    );

    this.pythonSocket.on('ai_response', async (data: AiResponseDto) => {
      await this.handleAiResponse(data);
    });
  }

  public sendAudioChunkToPython(interviewId: string, chunk: Buffer) {
    this.pythonSocket.emit('audio_chunk', {
      interviewId,
      chunk,
    });
  }

  private async handleAiResponse(dto: AiResponseDto) {
    const { interviewId, userText, aiText, audioBuffer } = dto;

    await this.prismaService.message.create({
      data: {
        interviewId,
        role: MessageRoleEnum.USER,
        content: userText,
      },
    });

    await this.prismaService.message.create({
      data: {
        interviewId,
        role: MessageRoleEnum.AI,
        content: aiText,
      },
    });

    this.eventEmmiter.emit('ai.response.ready', {
      interviewId,
      text: aiText,
      audioBuffer,
    });
  }

  public async sendAudioEndToPython(interviewId: string) {
    const interview = await this.interviewService.findById(interviewId);

    if (!interview) throw Error('Интервью с таким interviewId не найдено');

    const { grade, topic } = interview;

    const messages =
      await this.messageService.findManyByInterviewId(interviewId);

    if (!messages) throw Error('Сообщения с таким interviewId не найдены');

    this.pythonSocket.emit('audio_end', {
      interviewId,
      messages,
      grade,
      topic,
    });
  }
}
