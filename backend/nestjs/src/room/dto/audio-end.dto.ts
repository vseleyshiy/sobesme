import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import type { Message } from 'prisma/__generated__/client';
import { Grade } from 'prisma/__generated__/enums';

export class AudioEndDto {
  @IsString()
  @IsNotEmpty()
  interviewId: string;

  @IsNotEmpty()
  @IsEnum(Grade)
  grade: Grade;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsArray()
  @ArrayNotEmpty()
  messages: Message[];
}
