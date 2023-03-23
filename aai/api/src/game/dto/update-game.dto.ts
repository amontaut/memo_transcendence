import { PartialType } from '@nestjs/swagger';
import { CreateGameDto } from './create-game.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { Mode, Status } from "@prisma/client";

export class UpdateGameDto extends PartialType(CreateGameDto) {
    @ApiProperty()
    @IsString()
    @Length(4, 6)
    @IsOptional()
    mode: Mode;
    
    @ApiProperty()
    @IsString()
    @Length(5)
    @IsOptional()
    status: Status;
}
