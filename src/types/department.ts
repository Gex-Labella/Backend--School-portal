export interface Department {
  id?: string;
  name: string;
  description: string;
  icon: string;
  details?: {
    programs: string[];
    facultyCount: number;
    researchAreas: string[];
  };
}