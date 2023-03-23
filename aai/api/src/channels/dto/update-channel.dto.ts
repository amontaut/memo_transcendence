import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '@prisma/client';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto extends PartialType(CreateChannelDto) {}
