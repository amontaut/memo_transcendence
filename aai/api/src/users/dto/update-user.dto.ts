import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  tFA_secret?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  tFA_enabled?: boolean = false;

  // @ApiProperty()
  // @IsOptional()
  // friend_requests?: [];
}
