import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async getAllDepartments(): Promise<Department[]> {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: string): Promise<Department> {
    return await this.departmentsService.findById(id);
  }

  @Get('faculty/:facultyId')
  async getDepartmentsByFaculty(@Param('facultyId') facultyId: string): Promise<Department[]> {
    return await this.departmentsService.getDepartmentsByFaculty(facultyId);
  }

  @Get('search/head')
  async getDepartmentsByHead(@Query('name') headName: string): Promise<Department[]> {
    return await this.departmentsService.getDepartmentsByHead(headName);
  }

  @Get('search/research')
  async searchDepartmentsByResearch(@Query('topic') topic: string): Promise<Department[]> {
    return await this.departmentsService.searchDepartmentsByResearch(topic);
  }

  @Post()
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentsService.create(createDepartmentDto);
  }

  @Put(':id')
  async updateDepartment(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<Department> {
    return await this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: string): Promise<void> {
    await this.departmentsService.delete(id);
  }
}