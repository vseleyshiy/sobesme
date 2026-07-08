import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DifficultyEnum, GradeEnum } from 'prisma/__generated__/enums';

export class CreateInterviewDto {
  @IsEnum(GradeEnum)
  @IsNotEmpty()
  grade: GradeEnum;

  @IsEnum(DifficultyEnum)
  @IsNotEmpty()
  difficulty: DifficultyEnum;

  @IsString()
  @IsNotEmpty()
  topic: string;
}
