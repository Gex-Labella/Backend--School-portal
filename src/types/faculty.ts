export interface Program {
  id: string
  name: string
  degree: string
  duration: string
  researchAreas: string[]
  keyHighlights: string[]
  accreditations?: string[]
}

export interface CareerPath {
  title: string
  description: string
  potentialEmployers: string[]
  averageSalaryRange: string
  requiredSkills: string[]
}

  // Helper function to create mock faculty data with default values

  export interface Department {
    id: string;
    name: string;
    description: string;
    headOfDepartment: string;
    researchFoci: string[];
    icon: string;
    details: string[];
  }
  
  export interface Faculty {
    id: string;
    name: string;
    departments: Department[];
  }
  
  export function createMockFaculty(data: Faculty): Faculty {
    return {
      id: data.id,
      name: data.name,
      departments: data.departments.map(dept => ({
        ...dept,
        icon: dept.icon || 'default-icon',  // Provide default values
        details: dept.details || []         // Provide default values
      })),
    };
  }