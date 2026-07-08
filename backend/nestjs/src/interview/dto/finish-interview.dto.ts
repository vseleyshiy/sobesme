import { InterviewFeedbackDto } from '@/libs/common/dto/interview-feedback.dto';
import type { IInterviewFeedback } from '@/libs/common/types/interview-feedback.type';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FinishInterviewDto {
  @IsNotEmpty()
  @IsString()
  interviewId: string;

  @IsOptional()
  @Type(() => InterviewFeedbackDto)
  @ValidateNested()
  feedback?: IInterviewFeedback;
}
