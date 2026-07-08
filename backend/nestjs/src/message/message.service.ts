import { CreateMessageDto } from '@/message/dto/create-message.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findManyByInterviewId(interviewId: string) {
    return await this.prismaService.message.findMany({
      where: {
        interviewId,
      },
    });
  }

  public async findById(id: string) {
    return await this.prismaService.message.findUnique({
      where: {
        id,
      },
    });
  }

  public async create(dto: CreateMessageDto) {
    const { interviewId, content, role, currentHp } = dto;

    const message = await this.prismaService.message.create({
      data: {
        interviewId,
        role,
        content,
        currentHp,
      },
    });

    return message;
  }
}
