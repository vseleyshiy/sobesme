import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async validateInterviewAccess(userId: string, interviewId: string) {
    const interview = await this.prismaService.interview.findFirst({
      where: {
        id: interviewId,
        userId,
      },
    });

    if (!interview)
      throw new Error('Интервью с таким пользователем не найдено.');

    return true;
  }
}
