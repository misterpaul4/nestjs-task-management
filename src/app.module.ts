import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      host: 'localhost',
      database: 'postgres',
      schema: 'test_task_management',
      username: 'postgres',
      password: null,
    }),
    UsersModule,
    TagsModule,
  ],
})
export class AppModule {}
