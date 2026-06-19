import { getProvidersConfig } from '@/config/providers.config';
import { MailModule } from '@/libs/mail/mail.module';
import { ProviderModule } from '@/provider/provider.module';
import { UserModule } from '@/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';

@Module({
  imports: [
    UserModule,
    MailModule,
    ProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getProvidersConfig,
      inject: [ConfigService],
    }),
    forwardRef(() => EmailConfirmationModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
