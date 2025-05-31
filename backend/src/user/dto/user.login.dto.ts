import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export default class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @Length(8, 50)
  public password: string;
}
