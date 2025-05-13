export interface Faculty {
    id: string;
    name: string;
    description: string;
    departmentId: string;  // Primary department
    icon: string;
    departments: string[];
  }