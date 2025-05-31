import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/todo')
export default class TodoController {
  @Post()
  async post(@Req() req: Request) {
    const token = req.headers.authorization;
    console.log(token);
  }
}
