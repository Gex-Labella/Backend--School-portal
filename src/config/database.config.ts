import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';


export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [User], // Add other entities here as needed
  synchronize: configService.get('NODE_ENV') !== 'production',
  logging: configService.get('NODE_ENV') !== 'production',
  autoLoadEntities: true,
  keepConnectionAlive: true,
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,

  // Additional production-ready configurations
  ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
  retryAttempts: 5,
  retryDelay: 3000,
});




