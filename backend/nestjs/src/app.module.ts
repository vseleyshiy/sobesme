import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module';
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module';
import { InterviewModule } from './interview/interview.module';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { MailModule } from './libs/mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProviderModule } from './provider/provider.module';
import { RedisModule } from './redis/redis.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProviderModule,
    MailModule,
    EmailConfirmationModule,
    PasswordRecoveryModule,
    InterviewModule,
    RoomModule,
    RedisModule,
  ],
})
export class AppModule {}
