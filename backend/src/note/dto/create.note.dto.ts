import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(5)
  description: string;
}
