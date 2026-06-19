import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { ConfirmationTemplate } from './templates/Confirmation.template';
import { ResetPasswordTemplate } from './templates/ResetPassword.template';

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendConfirmationEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');

    const html = await render(ConfirmationTemplate({ domain, token }));

    await this.sendMail(email, 'Подтверждение почты', html);
  }

  public async sendPasswordResetEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');

    const html = await render(ResetPasswordTemplate({ domain, token }));

    await this.sendMail(email, 'Сброс пароля', html);
  }

  private async sendMail(
    email: string,
    subject: string,
    html: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
