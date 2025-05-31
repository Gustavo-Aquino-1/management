import { Module } from '@nestjs/common';
import TodoController from './todo.controller';
import TodoService from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export default class TodoModule {}
