import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../core/types/base.types';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;  // Changed to string to match BaseEntity

    @Column({ unique: true })
    studentId: string;

    @Column()
    programName: string;

    @Column({ nullable: true })
    @IsEmail()
    email: string;

    @Column({ default: 0 })
    tokenVersion: number;

    @Column()
    @Exclude()
    @MinLength(8)
    password: string;

    @Column({ 
        type: 'enum', 
        enum: ['admin', 'user'], 
        default: 'user' 
    })
    role: 'admin' | 'user';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
