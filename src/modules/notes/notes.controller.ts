import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(): Promise<Note[]> {
    return await this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Note> {
    return await this.notesService.findOne(id);
  }

  @Get('faculty/:facultyId')
  async findByFaculty(@Param('facultyId') facultyId: string): Promise<Note[]> {
    return await this.notesService.findByFaculty(facultyId);
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.notesService.create(createNoteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return await this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.notesService.delete(id);
  }
}