import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class TodoPostDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  public title: string;

  @IsNotEmpty()
  @IsString()
  @Length(5)
  public description: string;

  @IsNotEmpty()
  @IsIn([1, 2, 3, 4, 5])
  public urgency: number;

  @IsOptional()
  @IsString()
  @IsIn(['PENDENT', 'WORKING', 'FINISHED'])
  public status?: string;
}
