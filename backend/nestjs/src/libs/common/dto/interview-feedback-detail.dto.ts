import { IsNotEmpty, IsString } from 'class-validator';

export class InterviewFeedbackDetailDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  userAnswer: string;

  @IsString()
  @IsNotEmpty()
  correction: string;

  @IsString()
  @IsNotEmpty()
  searchQuery: string;
}
