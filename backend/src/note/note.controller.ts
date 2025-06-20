import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import NoteService from './note.service';
import { Request } from 'express';
import CreateNoteDto from './dto/create.note.dto';
import UpdateNoteDto from './dto/update.note.dto';

@Controller('/notes')
export default class NoteController {
  public service: NoteService = new NoteService();

  @Get()
  async get(@Req() req: Request) {
    const token = req.headers.authorization;
    return await this.service.get(token);
  }

  @Post()
  async post(@Body() data: CreateNoteDto, @Req() req: Request) {
    const token = req.headers.authorization;
    return await this.service.post(data, token);
  }

  @Put('/:id')
  async put(@Param('id') id: string, @Body() data: UpdateNoteDto, @Req() req: Request) {
    const token = req.headers.authorization;
    return await this.service.put(+id, data, token);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization;
    return await this.service.remove(+id, token);
  }
}
