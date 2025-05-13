import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// Middleware
import { SessionTimeoutMiddleware } from './auth/middleware/session-timeout.middleware';

// Modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './modules/notes/notes.module';
import { DepartmentsModule } from './modules/department/departments.module';
import { FacultyModule } from './modules/faculty/faculty.module';

// Entities
import { User } from './users/entities/user.entity';
import { Note } from './modules/notes/entities/note.entity';
import { Department } from './modules/department/entities/department.entity';
import { Faculty } from './modules/faculty/entities/faculty.entity';
import { Program } from './modules/faculty/entities/program.entity';
import { CareerPath } from './modules/faculty/entities/career-path.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User,
          Note,
          Department,
          Faculty,
          Program,
          CareerPath
        ],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') !== 'production',
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    
    // Mailer configuration
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
        template: {
          dir: process.cwd() + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        defaults: {
          from: '"No Reply" '
        }
      }),
      inject: [ConfigService],
    }),

    // Feature modules
    UsersModule,
    AuthModule,
    NotesModule,
    DepartmentsModule,
    FacultyModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionTimeoutMiddleware)
      .forRoutes('*');
  }
}