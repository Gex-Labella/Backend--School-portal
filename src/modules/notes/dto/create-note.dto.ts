import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  facultyId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}