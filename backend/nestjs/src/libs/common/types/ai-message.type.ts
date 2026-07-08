import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MessageRoleEnum } from 'prisma/__generated__/enums';

export interface IAiMessage {
  role: MessageRoleEnum;
  content: string;
}

export class AiMessageDto {
  @IsEnum(MessageRoleEnum)
  @IsNotEmpty()
  role: MessageRoleEnum;

  @IsString()
  @IsNotEmpty()
  content: string;
}
