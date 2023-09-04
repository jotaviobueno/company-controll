import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCnpj', async: false })
export class IsValueIsCnpjValid implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _: ValidationArguments) {
    if (typeof value !== 'string' || value.length != 14) return false;

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'This cnpj its invalid.';
  }
}

export function IsCnpj() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueIsCnpjValid,
    });
  };
}
