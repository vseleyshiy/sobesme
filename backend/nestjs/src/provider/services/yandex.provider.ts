import { NotFoundException } from '@nestjs/common';
import { BaseOAuthService } from './base-oauth.service';
import type { TypeProviderOptions } from './types/provider-options.types';
import type { TypeUserInfo } from './types/user-info.types';
import type { YandexProfile } from './types/yandex-provider.types';

export class YandexProvider extends BaseOAuthService {
  public constructor(options: TypeProviderOptions) {
    super({
      name: 'yandex',
      authorize_url: 'https://oauth.yandex.ru/authorize',
      access_url: 'https://oauth.yandex.ru/token',
      profile_url: 'https://login.yandex.ru/info?format=json',
      scopes: options.scopes,
      client_id: options.cliend_id,
      client_secret: options.client_secret,
    });
  }

  public extractUserInfo(data: YandexProfile): TypeUserInfo {
    if (!data.emails) throw new NotFoundException('Почты не найдены');

    return super.extractUserInfo({
      email: data.emails[0],
      picture: data.default_avatar_id
        ? `https://avatarts.yandex.net/get-yapic/${data.default_avatar_id}/islands-200`
        : undefined,
    });
  }
}
