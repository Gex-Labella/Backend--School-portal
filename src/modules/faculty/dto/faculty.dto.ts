import { Faculty } from '../../../types/faculty';

export class CreateFacultyDto {
  id?: string;
  name: string;
  description: string;
  icon?: string;
  newFaculty: string;
  departments?: any[];
  programs?: any[]; 
  careerPaths?: any[]; 
}