import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createNewUser(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDTO
  ): Promise<User> {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.removeUser(id);
  }

  @Get('student/:studentId')
  async findByStudentId(@Param('studentId') studentId: string): Promise<User | undefined> {
    return this.usersService.findByStudentId(studentId);
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id') id: string, 
    @Body('role') role: 'admin' | 'user'
  ): Promise<User> {
    return this.usersService.updateUserRole(id, role);
  }
}