import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.validateStudentId(registerDto.studentId);

      const sanitizedDto = {
        ...registerDto,
        email: registerDto.email.toLowerCase().trim(),
        studentId: registerDto.studentId.trim(),
        firstName: registerDto.firstName.trim(),
        lastName: registerDto.lastName.trim(),
        programName: registerDto.programName.trim()
      };

      const result = await this.authService.register(sanitizedDto);
      
      // Adjust the return structure to match your service's response
      return {
        message: 'Registration successful',
        studentId: result.user.studentId,
        programName: result.user.programName,
        role: result.user.role
      };

    } catch (error) {
      if (error.code === '23505') {
        if (error.detail?.includes('email')) {
          throw new HttpException(
            'Email already registered',
            HttpStatus.CONFLICT
          );
        }
        if (error.detail?.includes('student_id')) {
          throw new HttpException(
            'Student ID already registered',
            HttpStatus.CONFLICT
          );
        }
        throw new HttpException(
          'Account already exists',
          HttpStatus.CONFLICT
        );
      }

      console.error('Registration error:', error);
      
      if (error.status === 400) {
        throw error;
      }

      throw new HttpException(
        'Registration failed. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async validateStudentId(studentId: string): Promise<void> {
    const isValid = /^[A-Z0-9]{8}$/.test(studentId);
    if (!isValid) {
      throw new HttpException(
        'Invalid student ID format',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
