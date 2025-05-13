import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCareerPathsTable1735040007596 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "career_paths",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "potentialEmployers",
                        type: "text",
                        isArray: true,
                    },
                    {
                        name: "averageSalaryRange",
                        type: "varchar",
                    },
                    {
                        name: "requiredSkills",
                        type: "text",
                        isArray: true,
                    },
                    {
                        name: "facultyId",
                        type: "varchar",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "now()",
                    },
                ]
            }),
            true
        )

        // Add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "career_paths" 
            ADD CONSTRAINT "FK_career_paths_faculty" 
            FOREIGN KEY ("facultyId") 
            REFERENCES "faculties"("id") 
            ON DELETE CASCADE
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("career_paths")
    }
}