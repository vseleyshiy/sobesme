import { PrismaService } from '@/prisma/prisma.service';
import { ProviderService } from '@/provider/provider.service';
import { UserService } from '@/user/user.service';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import type { Request, Response } from 'express';
import { AuthMethod, type User } from 'prisma/__generated__/browser';
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

  public async register(req: Request, dto: RegisterDto) {
    const { email, password } = dto;

    const isExists = await this.userService.findByEmail(email);

    if (isExists) throw new ConflictException('User is already exist');

    const newUser = await this.userService.create({
      email,
      password,
      picture: '',
      method: AuthMethod.CREDENTIALS,
      isVerified: false,
    });

    await this.emailConfigrmationServise.sendVerificationToken(newUser.email);

    return {
      message:
        'Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш email. Сообщение было отправлено на ваш почтовый адрес.',
    };
  }

  public async login(req: Request, dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userService.findByEmail(email);

    if (!user || !user.password)
      throw new NotFoundException('User is not found');

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword)
      throw new UnauthorizedException('Пароли не совпадают');

    if (!user.isVerified) {
      await this.emailConfigrmationServise.sendVerificationToken(user.email);

      throw new UnauthorizedException(
        'Ваш email не подтверждён. Пожалуйста, проверьте вашу почту и подтвердите адрес.',
      );
    }

    return this.saveSession(req, user);
  }

  public async extractProfileFromCode(
    req: Request,
    provider: string,
    code: string,
  ) {
    const providerInstance = this.providerService.findByService(provider);
    const profile = await providerInstance?.findUserByCode(code);

    if (!profile) throw new NotFoundException('Profile is not found');

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
      method: AuthMethod[profile.provider.toUpperCase() as AuthMethod],
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

  public async saveSession(req: Request, user: User) {
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
