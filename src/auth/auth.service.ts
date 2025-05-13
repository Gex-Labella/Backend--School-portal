import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  usersRepository: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { studentId: registerDto.studentId }
      });

      if (existingUser) {
        throw new ConflictException('Student ID already registered');
      }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create new user
    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    return this.generateToken(savedUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { studentId: loginDto.studentId },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id, email: user.email });

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { 
      sub: user.id, 
      studentId: user.studentId, 
      programName: user.programName,
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        studentId: user.studentId,
        programName: user.programName,
        role: user.role
      }
    };
  }
}