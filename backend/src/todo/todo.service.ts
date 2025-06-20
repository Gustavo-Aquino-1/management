import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import prisma from 'prisma/prisma.db';
import { verifyToken } from 'src/utils/verify.token';
import TodoGetDto from './dto/todo.get.dto';
import { generateFilterString } from 'src/utils/prisma.easy';
import mapTodo from './utils/map';
import { getNowBr } from 'src/utils/now';
import TodoPostDto from './dto/todo.post.dto';
import TodoPutDto from './dto/todo.put.dto';

@Injectable()
export default class TodoService {
  async post(token: string, data: TodoPostDto) {
    const secret = process.env.JWT_PASSWORD;

    const decodedUser = verifyToken(secret, token);
    return await prisma.task.create({
      data: {
        createdAt: getNowBr(),
        ...(data as any),
        user_id: decodedUser.id,
      },
    });
  }

  async put(token: string, data: TodoPutDto, id: number) {
    const secret = process.env.JWT_PASSWORD;

    const user = verifyToken(secret, token);

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if(!task) throw new NotFoundException({ message: 'Task not found'})

    if (task?.user_id != user.id)
      throw new ConflictException({ message: 'Unauthorized' });

    return await prisma.task.update({
      where: { id },
      data: data as any,
    });
  }

  async remove(token: string, id: number) {
    // isSameUser(id: Task | Any, user: ...payloadJwt, refrence: 'user_id' | 'writer_id' ...)
    const secret = process.env.JWT_PASSWORD;

    const user = verifyToken(secret, token);

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (task.user_id != user.id)
      throw new ConflictException({ message: 'Unauthorized' });

    return await prisma.task.delete({
      where: { id },
    });
  }

  async get(filters: Partial<TodoGetDto>, token) {
    let start = filters.start;
    const user = verifyToken(process.env.JWT_PASSWORD, token)
    delete filters.start;

    let filterToPrisma = { user_id: user.id };

    Object.keys(filters).map((key) => {
      filterToPrisma[key] = mapTodo[key].filter(
        filters[key],
        key,
        mapTodo[key].config || {},
      );
    });


    return await prisma.task.findMany({
      where: filterToPrisma,
      skip: +start || 0,
    });
  }
}
