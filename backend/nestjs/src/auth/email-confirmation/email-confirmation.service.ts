import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import type { Request } from 'express';
import { TokenEnum } from 'prisma/__generated__/enums';
import { v4 as uuidv4 } from 'uuid';
import type { AuthService as IAuthService } from '../auth.service';
import { AuthService } from '../auth.service';
import { ConfirmationDto } from './dto/confirmation.dto';

@Injectable()
export class EmailConfirmationService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: IAuthService,
  ) {}

  public async newVerification(req: Request, dto: ConfirmationDto) {
    const existingToken = await this.prismaService.token.findFirst({
      where: {
        token: dto.token,
        type: TokenEnum.VERIFICATION,
      },
    });

    if (!existingToken) {
      throw new NotFoundException('Токен не найден.');
    }

    const isExpired = new Date(existingToken.expiresIn) < new Date();

    if (isExpired)
      throw new BadRequestException(
        'Токен для подтверждения истёк. Пожалуйста, запросите новый токен для подтверждения.',
      );

    const existingUser = await this.userService.findByEmail(
      existingToken.email,
    );

    if (!existingUser)
      throw new NotFoundException(
        'Пользователь не найден. Пожалуйста, проверьте введённый адрес электронной почты и попробуйте снова.',
      );

    await this.prismaService.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isVerified: true,
      },
    });

    try {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenEnum.VERIFICATION,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          console.log(`Токен ${existingToken.id} уже был удален.`);
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...cleanUser } = existingUser;

    return this.authService.saveSession(req, cleanUser);
  }

  public async sendVerificationToken(email: string) {
    const verificationToken = await this.generateVerificationToken(email);

    await this.mailService.sendConfirmationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return true;
  }

  private async generateVerificationToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenEnum.VERIFICATION,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenEnum.VERIFICATION,
        },
      });
    }

    const verificationToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenEnum.VERIFICATION,
      },
    });

    return verificationToken;
  }
}
