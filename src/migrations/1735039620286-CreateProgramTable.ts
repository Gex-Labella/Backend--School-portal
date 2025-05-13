import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProgramTable1735039620286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "programs",
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
                        name: "degree",
                        type: "varchar",
                    },
                    {
                        name: "duration",
                        type: "varchar",
                    },
                    {
                        name: "researchAreas",
                        type: "text",
                        isArray: true,
                    },
                    {
                        name: "keyHighlights",
                        type: "text",
                        isArray: true,
                    },
                    {
                        name: "accreditations",
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
                foreignKeys: [
                    {
                        columnNames: ["facultyId"],
                        referencedTableName: "faculties",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("programs");
    }
}


