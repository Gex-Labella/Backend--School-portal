import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async findById(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({ 
      where: { id },
      relations: ['faculty']
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async getDepartmentsByFaculty(facultyId: string): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: { facultyId },
      relations: ['faculty']
    });
  }

  async getDepartmentsByHead(headName: string): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: { headOfDepartment: headName }
    });
  }

  async searchDepartmentsByResearch(researchTopic: string): Promise<Department[]> {
    const departments = await this.departmentRepository.find();
    return departments.filter(dept =>
      dept.researchFoci.some(focus =>
        focus.toLowerCase().includes(researchTopic.toLowerCase())
      )
    );
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create({
      ...createDepartmentDto,
      id: `${createDepartmentDto.name.toLowerCase().replace(/\s+/g, '-')}`
    });
    return await this.departmentRepository.save(department);
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.findById(id);
    const updatedDepartment = Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(updatedDepartment);
  }

  async delete(id: string): Promise<void> {
    const result = await this.departmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
  }
}