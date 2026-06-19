import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StatusType } from 'prisma/__generated__/enums';
import { StartInterview } from './dto/start-interview.dto';

@Injectable()
export class InterviewService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async start(
    userId: string,
    interviewBalance: number,
    dto: StartInterview,
  ) {
    if (interviewBalance === 0)
      throw new HttpException(
        'На вашем балансе недостаточно собеседований',
        HttpStatus.PAYMENT_REQUIRED,
      );

    const { grade, topic } = dto;

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        interviewsBalance: {
          decrement: 1,
        },
        interviews: {
          create: {
            grade,
            topic,
          },
        },
      },
    });

    return true;
  }

  public async history(userId: string) {
    return await this.prismaService.interview.findMany({
      where: {
        userId,
        status: StatusType.COMPLETED,
      },
    });
  }

  // public async finish();

  // public async results()
}
