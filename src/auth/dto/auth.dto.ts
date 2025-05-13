import { IsString, IsEmail, MinLength, Matches, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  studentId: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  programName: string; // Added this field as it's required by your system
}

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  studentId: string;

  @IsString()
  @MinLength(6)
  password: string;
}