import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculty.entity';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { BaseService } from '../../core/base.service';

@Injectable()
export class FacultyService extends BaseService<Faculty, CreateFacultyDto, UpdateFacultyDto> implements OnModuleInit {
    constructor(
        @InjectRepository(Faculty)
        private readonly facultyRepository: Repository<Faculty>
    ) {
        super(facultyRepository, 'Faculty');
    }
    
    async onModuleInit() {
        // Initialize default faculties when the module starts
        await this.initializeDefaultFaculties();
    }

    private async initializeDefaultFaculties() {
        const count = await this.facultyRepository.count();
        if (count === 0) {
            const defaultFaculties = [
                {
              id: 'computer-science',
              name: 'Computer Science',
              description: 'Pioneering technology and innovation through cutting-edge research and practical applications',
              departmentId: 'software-engineering', // Primary department
              icon: '/icons/icons8-computer-science-64.svg',
              departments: [
                'software-engineering',
                'artificial-intelligence'
              ]
            },
            {
              id: 'engineering',
              name: 'Engineering',
              description: 'Transforming ideas into reality through innovative design and practical solutions',
              departmentId: 'mechanical-engineering', // Primary department
              icon: '/icons/icons8-engineering-64.svg',
              departments: [
                'mechanical-engineering',
                'electrical-engineering'
              ]
            },
            {
              id: 'hospitality',
              name: 'Hospitality',
              description: 'Master the art of service and tourism',
              departmentId: 'tourism-management', // Primary department
              icon: '/icons/icons8-hospitality-64.svg',
              departments: [
                'tourism-management',
                'culinary-arts'
              ]
            },
            {
              id: 'journalism',
              name: 'Journalism',
              description: 'Shaping narratives and reporting truth',
              departmentId: 'digital-media', // Primary department
              icon: '/icons/icons8-journalism-64.svg',
              departments: [
                'digital-media',
                'investigative-reporting'
              ]
            },
            {
              id: 'law',
              name: 'Law',
              description: 'Upholding justice and legal principles',
              departmentId: 'corporate-law', // Primary department
              icon: '/icons/icons8-law-96.svg',
              departments: [
                'corporate-law',
                'human-rights'
              ]
            },
            {
              id: 'agriculture',
              name: 'Agriculture',
              description: 'Advancing sustainable farming practices',
              departmentId: 'crop-science', // Primary department
              icon: '/icons/icons8-agriculture-96.svg',
              departments: [
                'crop-science',
                'agricultural-economics'
              ]
            }
          ]; 
        await this.facultyRepository.save(defaultFaculties);
    }
}

// Override methods from BaseService to add relations
async findAll(): Promise<Faculty[]> {
  return await this.facultyRepository.find({
      relations: ['departmentsList', 'programs', 'careerPaths']
  });
}

async findOne(id: string): Promise<Faculty> {
  const faculty = await this.facultyRepository.findOne({
      where: { id },
      relations: ['departmentsList', 'programs', 'careerPaths']
  });
  if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
  }
  return faculty;
}

async create(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
  const faculty = this.facultyRepository.create({
      ...createFacultyDto,
      id: createFacultyDto.id || `faculty-${Math.random().toString(36).substr(2, 9)}`
  });
  return await this.facultyRepository.save(faculty);
}

async findByName(name: string): Promise<Faculty | null> {
  return this.facultyRepository.findOne({ 
      where: { name },
      relations: ['departmentsList', 'programs', 'careerPaths']
  });
}

async update(id: string, updateFacultyDto: UpdateFacultyDto): Promise<Faculty> {
    const faculty = await this.findOne(id);
    const updatedFaculty = Object.assign(faculty, updateFacultyDto);
    return await this.facultyRepository.save(updatedFaculty);
}

async remove(id: string): Promise<void> {
    const result = await this.facultyRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Faculty with ID ${id} not found`);
    }
}

}