import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GradeEnum } from 'prisma/__generated__/enums';

export class StartInterviewDto {
  @IsEnum(GradeEnum)
  @IsNotEmpty()
  grade: GradeEnum;

  @IsString()
  @IsNotEmpty()
  topic: string;
}
