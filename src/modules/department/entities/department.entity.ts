
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from '../../../core/types/base.types';
import { Faculty } from '../../faculty/entities/faculty.entity';
import { Program } from '../../faculty/entities/program.entity';

@Entity("departments")
export class Department extends BaseEntity {
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
    headOfDepartment: string;

    @Column("text", { array: true })
    researchFoci: string[];

    @Column()
    icon: string;

    @Column("text", { array: true })
    details: string[];

    @Column()
    facultyId: string;

    @ManyToOne(() => Faculty, faculty => faculty.departments)
    faculty: Faculty;

    @OneToMany(() => Program, program => program.department)
    programs: Program[];
}