import { PartialType } from '@nestjs/mapped-types';
import TodoPostDto from './todo.post.dto';

export default class TodoPutDto extends PartialType(TodoPostDto) {}
