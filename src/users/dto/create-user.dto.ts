import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  tags?: string[];
}
