import { InterviewFeedbackDetailDto } from '@/libs/common/dto/interview-feedback-detail.dto';
import type { IInterviewFeedbackDetail } from '@/libs/common/types/interview-feedback.type';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class InterviewFeedbackDto {
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  stressScore: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => InterviewFeedbackDetailDto)
  @ValidateNested({ each: true })
  details: IInterviewFeedbackDetail[];
}
