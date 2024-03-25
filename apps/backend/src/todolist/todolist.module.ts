import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from './todolist.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TodoList.name, schema: TodoListSchema }])],
  controllers: [TodolistController],
  providers: [TodolistService],
})
export class TodolistModule {}
