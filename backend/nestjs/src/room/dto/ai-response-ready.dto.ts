import { IsBuffer } from '@/libs/common/decorators/is-buffer.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class AiResponseReadyDto {
  @IsString()
  @IsNotEmpty()
  interviewId: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBuffer()
  @IsNotEmpty()
  audioBuffer: Buffer;
}
