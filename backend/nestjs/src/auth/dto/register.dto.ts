import { IsPasswordMatchingConstraint } from '@/libs/common/decorators/is-password-matching-comstraint.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Validate(IsPasswordMatchingConstraint)
  passwordRepeat: string;
}
