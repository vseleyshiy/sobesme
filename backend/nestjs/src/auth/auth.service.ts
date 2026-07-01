import { TypeCleanUser } from '@/libs/common/types/user.types';
import { PrismaService } from '@/prisma/prisma.service';
import { ProviderService } from '@/provider/provider.service';
import { UserService } from '@/user/user.service';
import {
  ConflictException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import type { Request, Response } from 'express';
import { AuthMethodEnum } from 'prisma/__generated__/enums';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';
import type { EmailConfirmationService as IEmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
    @Inject(forwardRef(() => EmailConfirmationService))
    private readonly emailConfigrmationServise: IEmailConfirmationService,
  ) {}

  public async register(dto: RegisterDto) {
    const { email, password } = dto;

    const isExists = await this.userService.findByEmail(email);

    if (isExists)
      throw new ConflictException(
        'Пользователь с такой почтой уже существует.',
      );

    const newUser = await this.userService.create({
      email,
      password,
      picture: '',
      method: AuthMethodEnum.CREDENTIALS,
      isVerified: false,
    });

    await this.emailConfigrmationServise.sendVerificationToken(newUser.email);

    return {
      message:
        'Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш email. Сообщение было отправлено на ваш почтовый адрес.',
    };
  }

  public async login(req: Request, dto: LoginDto) {
    const { email, password: fieldPassword } = dto;

    const user = await this.userService.findByEmail(email);

    if (!user || !user.password)
      throw new NotFoundException(
        'Либо пользователь с таким email не найден, либо он регистрировался с помощью социальной сети.',
      );

    if (!user.isVerified) {
      const token = await this.prismaService.token.findFirst({
        where: {
          email: user.email,
        },
      });

      if (token && token.expiresIn > new Date())
        throw new HttpException(
          'Вам на почту уже было отправлено письмо для подтверждения. Оно действительно в течение 1 часа.',
          HttpStatus.TOO_MANY_REQUESTS,
        );

      await this.emailConfigrmationServise.sendVerificationToken(user.email);

      throw new UnauthorizedException(
        'Ваш email не подтверждён. Пожалуйста, проверьте вашу почту и подтвердите адрес.',
      );
    }

    const isValidPassword = await verify(user.password, fieldPassword);

    if (!isValidPassword) throw new UnauthorizedException('Неверный пароль.');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...cleanUser } = user;

    return this.saveSession(req, cleanUser);
  }

  public async extractProfileFromCode(
    req: Request,
    provider: string,
    code: string,
  ) {
    const providerInstance = this.providerService.findByService(provider);
    const profile = await providerInstance?.findUserByCode(code);

    if (!profile) throw new NotFoundException('Профиль не найден.');

    const account = await this.prismaService.account.findFirst({
      where: {
        id: profile.id,
        provider: profile.provider,
      },
    });

    let user = account?.userId
      ? await this.userService.findById(account.userId)
      : null;

    if (user) {
      return this.saveSession(req, user);
    }

    user = await this.userService.create({
      email: profile.email,
      password: '',
      picture: profile?.picture,
      method: AuthMethodEnum[profile.provider.toUpperCase() as AuthMethodEnum],
      isVerified: true,
    });

    if (!account) {
      await this.prismaService.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: profile.provider,
          accessToken: profile.access_token,
          refreshToken: profile.refresh_token,
          expiresAt: profile.expires_at ?? 0,
        },
      });
    }

    return this.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException('Error. Session is not closed'),
          );
        }
        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
        resolve();
      });
    });
  }

  public async saveSession(req: Request, user: TypeCleanUser) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException('Session is not saved'),
          );
        }

        resolve({ user });
      });
    });
  }
}
