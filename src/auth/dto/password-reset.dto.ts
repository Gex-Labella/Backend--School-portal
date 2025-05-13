import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class RequestPasswordResetDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}