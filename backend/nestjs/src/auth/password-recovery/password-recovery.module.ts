import { MailModule } from '@/libs/mail/mail.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { PasswordRecoveryController } from './password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery.service';

@Module({
  imports: [MailModule, UserModule],
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService],
})
export class PasswordRecoveryModule {}
