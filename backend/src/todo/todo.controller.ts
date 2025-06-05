import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import TodoPostDto from './dto/todo.post.dto';
import TodoService from './todo.service';

@Controller('/todo')
export default class TodoController {
  private service: TodoService = new TodoService()

  @Post()
  async post(@Req() req: Request, @Body() data: TodoPostDto) {
    const token = req.headers.authorization;
    return await this.service.post(token, data)
  }
}
