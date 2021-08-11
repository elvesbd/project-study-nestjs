import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule } from './database/database.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule, DataBaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
