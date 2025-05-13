import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Department } from "../../department/entities/department.entity";
import { Program } from "./program.entity";
import { CareerPath } from "./career-path.entity";
import { BaseEntity } from '../../../core/types/base.types';

@Entity("faculties")
export class Faculty implements BaseEntity {
    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column()
    departmentId: string;
    
    @Column()
    icon: string;
    
    @Column("text", { array: true })
    departments: string[];
    
    @OneToMany(() => Department, department => department.faculty)
    departmentsList: Department[];
    
    @OneToMany(() => Program, program => program.faculty)
    programs: Program[];
    
    @OneToMany(() => CareerPath, careerPath => careerPath.faculty)
    careerPaths: CareerPath[];
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}