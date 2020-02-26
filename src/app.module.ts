import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
