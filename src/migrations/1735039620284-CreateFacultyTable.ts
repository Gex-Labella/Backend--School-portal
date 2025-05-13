import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFacultyTable1735039620284 implements MigrationInterface {
    name = 'CreateFacultyTable1735039620284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First we create the faculties table
        await queryRunner.createTable(
            new Table({
                name: "faculties",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "departmentId",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "icon",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "departments",
                        type: "text",
                        isArray: true,
                        isNullable: false,
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
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // If we need to rollback, drop the faculties table
        await queryRunner.dropTable("faculties");
    }
}
