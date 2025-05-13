import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateFacultyDto {
    @IsString()
    @IsOptional()
    id?: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    departmentId: string;
    
    @IsString()
    @IsOptional()
    icon?: string;
    
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    departments?: string[];
    
    @IsArray()
    @IsOptional()
    programs?: any[];
    
    @IsArray()
    @IsOptional()
    careerPaths?: any[];
}