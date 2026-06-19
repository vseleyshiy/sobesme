import type { TypeOptions } from '@/provider/provider.constants';
import { YandexProvider } from '@/provider/services/yandex.provider';
import type { ConfigService } from '@nestjs/config';

export const getProvidersConfig = (
  configService: ConfigService,
): TypeOptions => ({
  baseUrl: configService.getOrThrow<string>('APPLICATION_URL'),
  services: [
    new YandexProvider({
      cliend_id: configService.getOrThrow<string>('YANDEX_CLIENT_ID'),
      client_secret: configService.getOrThrow<string>('YANDEX_CLIENT_SECRET'),
      scopes: ['login:email', 'login:avatar', 'login:info'],
    }),
  ],
});
