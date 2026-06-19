import { isDev } from '@/libs/common/utils/is-dev.util';
import type { MailerOptions } from '@nestjs-modules/mailer';
import type { ConfigService } from '@nestjs/config';

export const getMailerConfig = (
  configService: ConfigService,
): MailerOptions => ({
  transport: {
    host: configService.getOrThrow<string>('MAIL_HOST'),
    port: configService.getOrThrow<number>('MAIL_PORT'),
    secure: !isDev(configService),
    ignoreTLS: isDev(configService),
    auth: {
      user:
        !isDev(configService) && configService.getOrThrow<string>('MAIL_LOGIN'),
      password:
        !isDev(configService) &&
        configService.getOrThrow<string>('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: '"SobesMe Support"',
  },
});
