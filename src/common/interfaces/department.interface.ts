export interface Department {
  id: string;
  name: string;
  description: string;
  headOfDepartment: string;
  researchFoci: string[];
  icon: string;
  details: {
    programs: string[];
    facultyCount: number;
    researchAreas: string[];
  };
}