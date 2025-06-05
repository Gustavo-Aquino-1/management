import { Injectable, UnauthorizedException } from '@nestjs/common';
import TodoPostDto from './dto/todo.post.dto';
import * as jwt from 'jsonwebtoken';
import prisma from 'prisma/prisma.db';

@Injectable()
export default class TodoService {
  async post(token: any, data: TodoPostDto) {
    if (typeof token != 'string')
      throw new UnauthorizedException({ message: 're-do login' });

    token = token.split('Bearer ')[1];
    const secret = process.env.JWT_PASSWORD;

    try {
      const decodedUser = jwt.verify(token, secret) as any;
      console.log(decodedUser);
      return await prisma.task.create({
        data: { ...(data as any), user_id: decodedUser.id },
      });
    } catch (error) {
      throw new UnauthorizedException({ message: 'Token need to refresh' });
    }
  }
}
