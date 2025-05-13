import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Faculty } from "./faculty.entity";
import { BaseEntity } from '../../../core/types/base.types';
import { Department } from '../../department/entities/department.entity';
import { CareerPath } from '../../faculty/entities/career-path.entity';


@Entity("programs")
export class Program extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    duration: number;

    @Column()
    credits: number;

    @Column()
    facultyId: string;

    @ManyToOne(() => Department, department => department.programs)
    department: Department;

    @ManyToOne(() => Faculty, faculty => faculty.programs)
    faculty: Faculty;

    @OneToMany(() => CareerPath, careerPath => careerPath.program)
    careerPaths: CareerPath[];
}