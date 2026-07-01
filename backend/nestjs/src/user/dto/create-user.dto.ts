import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { AuthMethodEnum } from 'prisma/__generated__/enums';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsNotEmpty()
  @IsString()
  method: AuthMethodEnum;

  @IsBoolean()
  isVerified: boolean;
}
