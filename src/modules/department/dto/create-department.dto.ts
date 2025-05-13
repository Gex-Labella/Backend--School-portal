import { IsString, IsNotEmpty, IsArray, IsUUID } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  headOfDepartment: string;

  @IsArray()
  @IsString({ each: true })
  researchFoci: string[];

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsArray()
  @IsString({ each: true })
  details: string[];

  @IsUUID()
  @IsNotEmpty()
  facultyId: string;
}