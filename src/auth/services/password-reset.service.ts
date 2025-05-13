import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';
import { RequestPasswordResetDto, ResetPasswordDto } from '../dto/password-reset.dto';
import { InvalidResetTokenException } from '../exceptions/auth.exceptions';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PasswordResetService  {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async requestPasswordReset(dto: RequestPasswordResetDto) {
    // Rate limiting should be implemented here
    const user = await this.usersRepository.findOne({
      where: {
        studentId: dto.studentId,
        email: dto.email
      }
    });

    // Always return the same response regardless of whether user exists
    const genericResponse = { 
      message: 'If your account exists, you will receive a password reset email.' 
    };

    if (!user) {
      return genericResponse;
    }

    const token = await this.generateResetToken(user);
    
    try {
      await this.sendResetEmail(user, token);
    } catch (error) {
      console.error('Failed to send reset email:', error);
      // Don't expose email sending failures to client
      return genericResponse;
    }

    return genericResponse;
  }

  private async generateResetToken(user: User): Promise<string> {
    return this.jwtService.sign(
      { 
        sub: user.id,
        type: 'password_reset' // Add token type for additional validation
      },
      { 
        expiresIn: '1h',
        jwtid: randomUUID() // Add unique identifier to prevent token reuse
      }
    );
  }

  private async sendResetEmail(user: User, token: string): Promise<void> {
    const resetLink = new URL(
      `/reset-password`,
      this.configService.get('FRONTEND_URL')
    );
    resetLink.searchParams.set('token', token);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      template: 'password-reset',
      context: {
        resetLink: resetLink.toString(),
        studentId: user.studentId,
        expirationTime: '1 hour'
      }
    });
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(dto.token);
      
      // Verify this is a password reset token
      if (payload.type !== 'password_reset') {
        throw new InvalidResetTokenException();
      }
    } catch (error) {
      throw new InvalidResetTokenException();
    }

    const user = await this.usersRepository.findOneBy({ id: payload.sub });
    if (!user) {
      throw new InvalidResetTokenException();
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    
    // Update password and invalidate all existing sessions
    await this.usersRepository.update(user.id, {
      password: hashedPassword,
      tokenVersion: () => 'tokenVersion + 1' // Increment token version
    });

    return { message: 'Password successfully reset' };
  }
}