export interface Faculty {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  icon: string;
  departments: string[];
}

export interface CreateFacultyDto extends Omit<Faculty, 'id'> {
  id?: string;
}