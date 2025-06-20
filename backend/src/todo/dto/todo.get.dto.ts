import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class TodoGetDto {
  @IsString()
  @IsOptional()
  public start?: string;

  @IsString()
  @IsOptional()
  @Length(3)
  public title?: string;

  @IsString()
  @IsOptional()
  @Length(3)
  public description?: string;

  @IsString()
  @IsOptional()
  public urgency?: string;

  @IsString()
  @IsOptional()
  @Length(10)
  public createdAt?: string;

  @IsString()
  @IsOptional()
  @IsIn(['PENDENT', 'WORKING', 'FINISHED'])
  public status?: string;
}
