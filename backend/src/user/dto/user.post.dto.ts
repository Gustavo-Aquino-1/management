import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export default class UserPostDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @Length(8, 50)
  public password: string;
}
