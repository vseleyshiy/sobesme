import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { StartInterviewDto } from './dto/start-interview.dto';

@Injectable()
export class InterviewService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAllByUserId(userId: string) {
    return await this.prismaService.interview.findMany({
      where: {
        userId,
      },
      include: {
        messages: true,
      },
    });
  }

  public async findById(interviewId: string) {
    return await this.prismaService.interview.findUnique({
      where: {
        id: interviewId,
      },
      include: {
        messages: true,
      },
    });
  }

  public async create(userId: string, dto: CreateInterviewDto) {
    const { grade, topic } = dto;

    const interview = await this.prismaService.interview.create({
      data: {
        userId,
        grade,
        topic,
      },
    });

    return interview;
  }

  public async start(
    userId: string,
    interviewBalance: number,
    dto: StartInterviewDto,
  ) {
    if (interviewBalance === 0)
      throw new HttpException(
        'На вашем балансе недостаточно собеседований.',
        HttpStatus.PAYMENT_REQUIRED,
      );

    const { grade, topic } = dto;

    const interview = await this.create(userId, {
      grade,
      topic,
    });

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        interviewsBalance: {
          decrement: 1,
        },
      },
    });

    return interview;
  }

  // public async finish();

  // public async results()
}
