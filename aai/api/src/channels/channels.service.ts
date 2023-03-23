import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { channelsConstants } from './channels.constants';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  async create(createChannelDto: CreateChannelDto, myId: number) {
    if (createChannelDto.password) {
      createChannelDto.password = await bcrypt.hash(
        createChannelDto.password,
        10,
      );
    }
    const thisChannel = await this.prisma.channel.create({
      data: createChannelDto,
    });
    await this.prisma.user.update({
      where: { id: myId },
      data: {
        own_channels: {
          connect: { id: +thisChannel.id },
        },
      },
    });
    return await this.prisma.channel.findUnique({
      where: { id: thisChannel.id },
      include: {
        owner: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.channel.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.channel.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateChannelDto: UpdateChannelDto) {
    return await this.prisma.channel.update({
      where: { id },
      data: updateChannelDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.channel.delete({
      where: { id },
    });
  }

  async addMember(id: number, memberId: number) {
    return await this.prisma.channel.update({
      where: { id },
      data: {
        members: {
          connect: { id: memberId },
        },
      },
      include: {
        members: true,
      },
    });
  }

  async findMembers(id: number) {
    return this.prisma.channel.findMany({
      where: { id },
      include: { members: true },
    });
  }

  async deleteMember(id: number, memberId: number) {
    return await this.prisma.channel.update({
      where: { id },
      data: {
        members: {
          disconnect: { id: memberId },
        },
      },
      include: {
        members: true,
      },
    });
  }

  async addAdmin(id: number, adminId: number) {
    return await this.prisma.channel.update({
      where: { id },
      data: {
        admins: {
          connect: { id: adminId },
        },
      },
      include: {
        admins: true,
      },
    });
  }

  async findAdmins(id: number) {
    return this.prisma.channel.findMany({
      where: { id },
      include: { admins: true },
    });
  }

  async deleteAdmin(id: number, adminId: number) {
    const thisChannel = await this.findOne(id);
    if (thisChannel.ownerId != adminId) {
      return await this.prisma.channel.update({
        where: { id },
        data: {
          admins: {
            disconnect: { id: adminId },
          },
        },
        include: {
          admins: true,
        },
      });
    } else {
      return console.error('Owner should be Admin');
    }
  }

  async addBanned(id: number, bannedId: number) {
    this.deleteBannedAfterTimout(id, bannedId);
    return await this.prisma.channel.update({
      where: { id },
      data: {
        banned: {
          connect: { id: bannedId },
        },
      },
      include: {
        banned: true,
      },
    });
  }
  
  deleteBannedAfterTimout(id: number, bannedId: number) {
    setTimeout(() => {
      this.deleteBanned(id, bannedId);
    }, channelsConstants.timeOut);
  };
    
  async findBanneds(id: number) {
    return this.prisma.channel.findMany({
      where: { id },
      include: { banned: true },
    });
  }


  async deleteBanned(id: number, bannedId: number) {
    return await this.prisma.channel.update({
      where: { id },
      data: {
        banned: {
          disconnect: { id: bannedId },
        },
      },
      include: {
        banned: true,
      },
    });
  }

  async addMuted(id: number, mutedId: number) {
    this.deleteMutedAfterTimout(id, mutedId);
    return await this.prisma.channel.update({
      where: { id },
      data: {
        muted: {
          connect: { id: mutedId },
        },
      },
      include: {
        muted: true,
      },
    });
  }

  deleteMutedAfterTimout(id: number, mutedId: number) {
    setTimeout(() => {
      this.deleteMuted(id, mutedId);
    }, channelsConstants.timeOut);
  };

  async findMuteds(id: number) {
    return this.prisma.channel.findMany({
      where: { id },
      include: { muted: true },
    });
  }

  async deleteMuted(id: number, mutedId: number) {
    return await this.prisma.channel.update({
      where: { id },
      data: {
        muted: {
          disconnect: { id: mutedId },
        },
      },
      include: {
        muted: true,
      },
    });
  }
}
