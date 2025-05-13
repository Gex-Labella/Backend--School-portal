import { AppDataSource } from "src/config/data-source";
import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { config } from 'dotenv';

config();

const dataSourcePath = path.join(__dirname, 'config', 'data-source');

async function testConnection() {
    try {
        const { AppDataSource } = await import(dataSourcePath);
        
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        
        const result = await AppDataSource.query('SELECT NOW()');
        console.log("Database connection test result:", result);
        
        await AppDataSource.destroy();
        console.log("Connection closed successfully");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
        console.error("Error details:", err.message);
        process.exit(1);
    }
}

testConnection().catch(error => {
    console.error("Unhandled error:", error);
    process.exit(1);
});