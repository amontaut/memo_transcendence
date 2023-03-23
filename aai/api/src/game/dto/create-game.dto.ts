import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { Mode } from "@prisma/client";

export class CreateGameDto {
  @ApiProperty()
  @IsString()
  @Length(4, 6)
  @IsOptional()
  mode: Mode;
}
