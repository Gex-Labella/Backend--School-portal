import { createConnection, ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "postgres", // or your database type
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "faculty_db",
    entities: [
        __dirname + "/../entities/*.ts"
    ],
    synchronize: false
};

async function dropTables() {
    try {
        console.log("Connecting to database...");
        const connection = await createConnection(config);
        
        console.log("Executing DROP TABLE command...");
        await connection.query(
            "DROP TABLE IF EXISTS migrations, departments, faculties CASCADE;"
        );
        
        console.log("Tables dropped successfully!");
        await connection.close();
    } catch (error) {
        console.error("Error dropping tables:", error);
        process.exit(1);
    }
}

dropTables();