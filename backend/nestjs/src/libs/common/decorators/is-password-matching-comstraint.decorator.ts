import { RegisterDto } from '@/auth/dto/register.dto';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordsMatching', async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
  public validate(passwordRepeat: string, args: ValidationArguments): boolean {
    const object = args.object as RegisterDto;
    return object.password === passwordRepeat;
  }

  public defaultMessage(): string {
    return 'Passwords are not matching';
  }
}
