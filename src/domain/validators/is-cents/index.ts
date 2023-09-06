import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCents', async: false })
export class IsCentsConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 1)
      return false;

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'The value must be an integer representing cents.';
  }
}

export function IsCents() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isCents',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsCentsConstraint,
    });
  };
}
