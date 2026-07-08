import { InterviewService } from '@/interview/interview.service';
import { IInterviewFeedback } from '@/libs/common/types/interview-feedback.type';
import { MessageService } from '@/message/message.service';
import { PrismaService } from '@/prisma/prisma.service';
import { AiResponseDto } from '@/python/dto/ai-response.dto';
import { AnalyzeInterviewDto } from '@/python/dto/analyze-interview.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageRoleEnum } from 'prisma/__generated__/enums';
import { firstValueFrom } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class PythonService implements OnModuleInit {
  private pythonSocket: Socket;
  private FASTAPI_SERVER: string;
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly interviewService: InterviewService,
    private readonly messageService: MessageService,
    private readonly configService: ConfigService,
    private readonly eventEmmiter: EventEmitter2,
    private readonly httpService: HttpService,
  ) {}
  onModuleInit() {
    this.FASTAPI_SERVER =
      this.configService.getOrThrow<string>('FASTAPI_SERVER');

    this.pythonSocket = io(this.FASTAPI_SERVER, {
      transports: ['websocket'],
    });

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
    const {
      interviewId,
      userText,
      aiText,
      emotion,
      impact,
      status,
      audioBuffer,
    } = dto;

    if (Object.values(dto).every((value) => value !== undefined)) {
      const currentHp = await this.interviewService.changeHp(
        interviewId,
        impact,
      );

      if (status === 'COMPLETED' || currentHp <= 0) {
        await this.analyzeInterview({ interviewId });
      }

      await this.prismaService.$transaction([
        this.prismaService.message.create({
          data: {
            interviewId,
            role: MessageRoleEnum.user,
            content: userText,
            currentHp,
          },
        }),
        this.prismaService.message.create({
          data: {
            interviewId,
            role: MessageRoleEnum.assistant,
            content: aiText,
          },
        }),
      ]);
    }

    this.eventEmmiter.emit('ai.response.ready', {
      interviewId,
      text: aiText,
      impact,
      emotion,
      status,
      audioBuffer,
    });
  }

  public async sendAudioEndToPython(interviewId: string) {
    const interview = await this.interviewService.findById(interviewId);

    if (!interview) throw Error('Интервью с таким interviewId не найдено');

    const { grade, topic, difficulty, hp } = interview;

    const messages =
      await this.messageService.findManyByInterviewId(interviewId);

    if (!messages) throw Error('Сообщения с таким interviewId не найдены');

    this.pythonSocket.emit('audio_end', {
      interviewId,
      messages,
      grade,
      topic,
      difficulty,
      hp,
    });
  }

  public async analyzeInterview(dto: AnalyzeInterviewDto) {
    const { interviewId } = dto;

    const messages =
      await this.messageService.findManyByInterviewId(interviewId);

    const interview = await this.interviewService.findById(interviewId);

    if (!messages || !interview)
      throw new NotFoundException(
        'Собеседование или сообщения с таким interviewId не найдены',
      );

    const { grade, topic, difficulty, hp } = interview;

    const data = {
      messages,
      grade,
      topic,
      difficulty,
      hp,
    };

    const response = await firstValueFrom(
      this.httpService.post<IInterviewFeedback>(
        `${this.FASTAPI_SERVER}/ai/analyze-interview`,
        data,
      ),
    );

    const updatedInterview = await this.interviewService.finish({
      interviewId,
      feedback: response.data,
    });

    return updatedInterview;
  }
}
