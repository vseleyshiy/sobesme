import { IsBuffer } from '@/libs/common/decorators/is-buffer.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @IsBuffer()
  @IsNotEmpty()
  audioBuffer: Buffer;
}
