import { Injectable } from '@nestjs/common';
import CreateNoteDto from './dto/create.note.dto';
import prisma from 'prisma/prisma.db';
import { verifyToken } from 'src/utils/verify.token';

@Injectable()
export default class NoteService {
  async get(token) {
    const { id: user_id } = verifyToken(process.env.JWT_PASSWORD, token);

    return await prisma.notes.findMany({
      where: { user_id },
    });
  }

  async post(data: CreateNoteDto, token) {
    const user = verifyToken(process.env.JWT_PASSWORD, token);

    return await prisma.notes.create({
      data: {
        ...(data as any),
        user_id: user.id,
      },
    });
  }

  async put(id: number, data: Partial<CreateNoteDto>, token) {
    const { id: user_id } = verifyToken(process.env.JWT_PASSWORD, token);

    return await prisma.notes.update({
      where: { id, user_id },
      data,
    });
  }

  async remove(id, token) {
    const user = verifyToken(process.env.JWT_PASSWORD, token);

    return await prisma.notes.delete({
      where: { id, user_id: user.id },
    });
  }
}


