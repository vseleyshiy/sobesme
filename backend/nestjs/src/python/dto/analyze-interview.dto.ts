import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeInterviewDto {
  @IsString()
  @IsNotEmpty()
  interviewId: string;
}
