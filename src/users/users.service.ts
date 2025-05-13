import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../core/base.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService extends BaseService<User, CreateUserDto, UpdateUserDTO> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository, 'User');
  }

  // Base service methods (inherited automatically)
  async getAllUsers(): Promise<User[]> {
    return this.findAll(); // Uses base service method
  }

  async getUserById(id: string): Promise<User> {
    return this.findOne(id); // Uses base service method
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    return this.create(createUserDto); // Uses base service method
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDTO): Promise<User> {
    return this.update(id, updateUserDto); // Uses base service method
  }

  async removeUser(id: string): Promise<void> {
    return this.delete(id); // Uses base service method
  }

  // Your existing custom methods
  async findByStudentId(studentId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { studentId } });
  }

  // Additional custom methods if needed
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUserRole(id: string, role: 'admin' | 'user'): Promise<User> {
    return this.update(id, { role } as UpdateUserDTO);
  }
}