import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { BaseEntity } from '../../../core/types/base.types';
import { Program } from '../../faculty/entities/program.entity';
import { Faculty } from '../../faculty/entities/faculty.entity';

@Entity("career_paths")
export class CareerPath extends BaseEntity {
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

    @Column("text", { array: true })
    skills: string[];

    @Column("text", { array: true })
    jobOpportunities: string[];

    @Column()
    facultyId: string;

    @ManyToOne(() => Program, program => program.careerPaths)
    program: Program;

    @ManyToOne(() => Faculty, faculty => faculty.careerPaths)
    faculty: Faculty;
}