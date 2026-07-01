import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsBuffer(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBuffer',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Buffer.isBuffer(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Buffer instance`;
        },
      },
    });
  };
}
