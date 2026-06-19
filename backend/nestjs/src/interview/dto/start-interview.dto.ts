import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Grade } from 'prisma/__generated__/enums';

export class StartInterview {
  @IsEnum(Grade)
  @IsNotEmpty()
  grade: Grade;

  @IsString()
  @IsNotEmpty()
  topic: string;
}
