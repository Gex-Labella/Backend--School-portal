export interface Faculty {
    id: string;
    name: string;
    description: string;
    icon: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    facultyId: string;
    role: 'student' | 'teacher' | 'admin';
  }
  
  export interface Course {
    id: string;
    title: string;
    facultyId: string;
    description: string;
    instructors: string[];
  }