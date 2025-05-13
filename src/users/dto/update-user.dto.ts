export class UpdateUserDTO {
    username?: string;
    studentId?: string;
    programName?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user'
}