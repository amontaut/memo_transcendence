import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty()
  @IsString()
  @Length(1, 25)
  name: string;

  @ApiProperty()
  @IsString()
  access: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;
}
