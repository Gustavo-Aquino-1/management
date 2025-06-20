import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UserModule from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import TodoModule from './todo/todo.module';
import NoteModule from './note/note.module';

@Module({
  imports: [
    UserModule,
    TodoModule,
    NoteModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
