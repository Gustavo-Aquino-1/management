import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import TodoService from './todo.service';
import TodoGetDto from './dto/todo.get.dto';
import TodoPutDto from './dto/todo.put.dto';
import TodoPostDto from './dto/todo.post.dto';

@Controller('/todo')
export default class TodoController {
  private service: TodoService = new TodoService();

  @Post()
  async post(@Req() req: Request, @Body() data: TodoPostDto) {
    const token = req.headers.authorization;
    return await this.service.post(token, data);
  }

  @Put('/:id')
  async put(
    @Req() req: Request,
    @Body() data: TodoPutDto,
    @Param('id') id: string,
  ) {
    const token = req.headers.authorization;
    return await this.service.put(token, data, +id);
  }

  @Delete('/:id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const token = req.headers.authorization;
    return await this.service.remove(token, +id);
  }

  //_num para todos números

  @Get()
  async get(@Query() filters: TodoGetDto, @Req() req: Request) {
    const token = req.headers.authorization;
    return await this.service.get(filters, token);
  }
}
