import { DataSource, DataSourceOptions } from "typeorm";
import { Faculty } from '../modules/faculty/entities/faculty.entity';
import { Department } from '../modules/department/entities/department.entity';
import { Program } from '../modules/faculty/entities/program.entity';
import { CareerPath } from '../modules/faculty/entities/career-path.entity';
import { User } from '../users/entities/user.entity';
import { Note } from '../modules/notes/entities/note.entity';
import 'dotenv/config';

const config: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'faculty_db',
    entities: [
        Faculty,
        Department,
        Program,
        CareerPath,
        User,
        Note
    ],
    migrations: ["dist/migrations/*.js"],
    synchronize: false,
    logging: true,
};

export const AppDataSource = new DataSource(config);