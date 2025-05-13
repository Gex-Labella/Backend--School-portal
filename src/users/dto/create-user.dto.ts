import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
    username: string;
    role?: 'admin' | 'user';
    
    @IsString()
    studentId: string;

    @IsString()
    programName: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(8)
    password: string;
}