import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  id42: string;

  @ApiProperty()
  @IsString()
  @Length(1, 25)
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string = 'https://';

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;
}
