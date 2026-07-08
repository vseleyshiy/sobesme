import { IsBuffer } from '@/libs/common/decorators/is-buffer.decorator';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EmotionsEnum, StatusEnum } from 'prisma/__generated__/enums';

export class AiResponseDto {
  @IsString()
  @IsNotEmpty()
  interviewId: string;

  @IsString()
  @IsNotEmpty()
  userText: string;

  @IsString()
  @IsNotEmpty()
  aiText: string;

  @IsNotEmpty()
  @IsEnum(EmotionsEnum)
  emotion: EmotionsEnum;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @IsNotEmpty()
  @IsNumber()
  impact: number;

  @IsBuffer()
  @IsNotEmpty()
  audioBuffer: Buffer;
}
