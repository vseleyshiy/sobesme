import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  public constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = new Redis({
      host: this.configService.getOrThrow<string>('REDIS_HOST'),
      port: this.configService.getOrThrow<number>('REDIS_PORT'),
    });
  }

  onModuleDestroy() {
    this.client.disconnect();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}
