import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'studentId', async: false })
export class StudentIdValidator implements ValidatorConstraintInterface {
  validate(studentId: string, args: ValidationArguments) {
    // Example format: STD/2024/001
    const regex = /^STD\/\d{4}\/\d{3}$/;
    return regex.test(studentId);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Student ID must be in format STD/YYYY/XXX';
  }
}