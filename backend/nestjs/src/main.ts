import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RedisStore } from 'connect-redis';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Redis } from 'ioredis';
import { AppModule } from './app.module';
import { ms } from './libs/common/utils/ms.util';
import { parseBoolean } from './libs/common/utils/parse-boolean.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = app.get(ConfigService);
  const redis = new Redis({
    host: config.getOrThrow<string>('REDIS_HOST'),
    port: config.getOrThrow<number>('REDIS_PORT'),
  });

  app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: ms(config.getOrThrow<string>('SESSION_MAX_AGE')),
        httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
        sameSite: 'lax',
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow<string>('SESSION_FOLDER'),
      }),
    }),
  );

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'));
}
bootstrap();
