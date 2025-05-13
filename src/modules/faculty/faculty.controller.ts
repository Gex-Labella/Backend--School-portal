import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Controller('faculty')
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) {}
    
    @Get()
    async findAll() {
        return await this.facultyService.findAll();
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.facultyService.findOne(id);
    }
    
    @Post()
    async create(@Body() createFacultyDto: CreateFacultyDto) {
        return await this.facultyService.create(createFacultyDto);
    }
    
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateFacultyDto: UpdateFacultyDto
    ) {
        return await this.facultyService.update(id, updateFacultyDto);
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string) {  // Changed from "remove" to "delete"
        return await this.facultyService.delete(id);
    }
    
    @Get('name/:name')
    async findByName(@Param('name') name: string) {
        return await this.facultyService.findByName(name);
    }
}