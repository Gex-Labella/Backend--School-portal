import { MigrationInterface, QueryRunner } from "typeorm";

export class EnhanceFacultySchema1735061651637 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // First drop existing tables if they exist to avoid conflicts
        await queryRunner.query(`DROP TABLE IF EXISTS career_paths CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS programs CASCADE`);
        
        // Modify departments table columns
        await queryRunner.query(`
            ALTER TABLE departments 
                ALTER COLUMN id TYPE varchar,
                ALTER COLUMN name TYPE varchar,
                ALTER COLUMN description TYPE text,
                ALTER COLUMN "headOfDepartment" TYPE varchar,
                ALTER COLUMN "researchFoci" TYPE text[],
                ALTER COLUMN "facultyId" TYPE varchar;
        `);

        // Create programs table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS programs (
                id varchar PRIMARY KEY,
                name varchar NOT NULL,
                degree varchar NOT NULL,
                duration varchar NOT NULL,
                "researchAreas" text[] NOT NULL,
                "keyHighlights" text[] NOT NULL,
                accreditations text[],
                "facultyId" varchar NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_program_faculty 
                    FOREIGN KEY ("facultyId") 
                    REFERENCES faculties(id) 
                    ON DELETE CASCADE
            )
        `);

        // Create career_paths table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS career_paths (
                id SERIAL PRIMARY KEY,
                title varchar NOT NULL,
                description text NOT NULL,
                "potentialEmployers" text[] NOT NULL,
                "averageSalaryRange" varchar NOT NULL,
                "requiredSkills" text[] NOT NULL,
                "facultyId" varchar NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_career_faculty 
                    FOREIGN KEY ("facultyId") 
                    REFERENCES faculties(id) 
                    ON DELETE CASCADE
            )
        `);

        // Add foreign key constraint to departments if it doesn't exist
        await queryRunner.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (
                    SELECT 1 
                    FROM information_schema.table_constraints 
                    WHERE constraint_name = 'fk_department_faculty'
                ) THEN
                    ALTER TABLE departments
                    ADD CONSTRAINT fk_department_faculty
                    FOREIGN KEY ("facultyId")
                    REFERENCES faculties(id)
                    ON DELETE CASCADE;
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove foreign key constraints first
        await queryRunner.query(`
            ALTER TABLE IF EXISTS career_paths 
            DROP CONSTRAINT IF EXISTS fk_career_faculty
        `);
        
        await queryRunner.query(`
            ALTER TABLE IF EXISTS programs 
            DROP CONSTRAINT IF EXISTS fk_program_faculty
        `);
        
        await queryRunner.query(`
            ALTER TABLE IF EXISTS departments 
            DROP CONSTRAINT IF EXISTS fk_department_faculty
        `);

        // Then drop tables in reverse order
        await queryRunner.query(`DROP TABLE IF EXISTS career_paths CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS programs CASCADE`);
        
        // Revert departments table columns to their original types if needed
        await queryRunner.query(`
            ALTER TABLE IF EXISTS departments 
                ALTER COLUMN id TYPE varchar,
                ALTER COLUMN name TYPE varchar,
                ALTER COLUMN description TYPE varchar,
                ALTER COLUMN "headOfDepartment" TYPE varchar,
                ALTER COLUMN "researchFoci" TYPE text[],
                ALTER COLUMN "facultyId" TYPE varchar;
        `);
    }
}