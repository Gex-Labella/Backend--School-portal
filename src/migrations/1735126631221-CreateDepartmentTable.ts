import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDepartmentTable1735039620285 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "departments",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "headOfDepartment",
                        type: "varchar",
                    },
                    {
                        name: "researchFoci",
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
                ],
            })
        );

        // Add foreign key constraint
        await queryRunner.createForeignKey(
            "departments",
            new TableForeignKey({
                columnNames: ["facultyId"],
                referencedColumnNames: ["id"],
                referencedTableName: "faculties",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("departments");
    }
}