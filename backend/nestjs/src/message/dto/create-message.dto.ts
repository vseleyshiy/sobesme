import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MessageRoleEnum } from 'prisma/__generated__/enums';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  interviewId: string;

  @IsEnum(MessageRoleEnum)
  @IsNotEmpty()
  role: MessageRoleEnum;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsOptional()
  currentHp?: number;
}
