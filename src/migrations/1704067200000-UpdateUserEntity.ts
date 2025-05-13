import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateUserEntity1704067200000 implements MigrationInterface {
    name = 'UpdateUserEntity1704067200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" 
            ADD "studentId" varchar NOT NULL,
            ADD "programName" varchar NOT NULL,
            ADD CONSTRAINT "UQ_STUDENT_ID" UNIQUE ("studentId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" 
            DROP CONSTRAINT "UQ_STUDENT_ID",
            DROP COLUMN "studentId",
            DROP COLUMN "programName"
        `);
    }
}