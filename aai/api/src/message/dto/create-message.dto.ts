import { ApiProperty } from '@nestjs/swagger';
import { Channel, User } from '@prisma/client';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  author: any;

  @ApiProperty()
  @IsString()
  @IsOptional()
  channel: any;
}
