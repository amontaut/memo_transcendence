import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findOrCreateSchool(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { id42: createUserDto.id42}
    });
    if (!user) {
      if (createUserDto.password) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      }
      return this.create(createUserDto);
    } else {
      const { password, ...result } = user;
      return result;
    }
  }

  async findAll(): Promise<any> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<any> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async findById42(id42: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { id42 },
    });
  }

  async addFriendRequest(id: number, myId: number) {
    await this.prisma.user.update({
      where: { id: myId },
      data: {
        friend_requests_sent: {
          connect: { id },
        },
      },
    });
    return await this.prisma.user.update({
      where: { id },
      data: {
        friend_requests_received: {
          connect: { id: myId },
        },
      },
      include: {
        friend_requests_received: true,
      },
    });
  }

  async findFriendRequestsReceived(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { friend_requests_received: true },
    });
  }

  async findFriendRequestsSent(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { friend_requests_sent: true },
    });
  }

  async deleteFriendRequest(id: number, myId: number) {
    await this.prisma.user.update({
      where: { id: myId },
      data: {
        friend_requests_sent: {
          disconnect: { id },
        },
      },
    });
    return await this.prisma.user.update({
      where: { id },
      data: {
        friend_requests_received: {
          disconnect: { id: myId },
        },
      },
      include: {
        friend_requests_received: true,
      },
    });
  }

  async addFriend(id: number, myId: number) {
    const check_friend_request = await this.prisma.user.findFirst({
      where: { id: myId,
              friend_requests_received: {
                some: { id: id },
              },
            }},
      
    );
    if (!check_friend_request) {
      return console.error("User", id, "didn't send you friend request");
    };
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        friends: {
          connect: { id },
        },
      },
      include: {
        friends: true,
      },
    });
  }

  async findFriends(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { friends: true },
    });
  }

  async deleteFriend(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        friends: {
          disconnect: { id: myId },
        },
      },
      include: {
        friends: true,
      },
    });
  }

  async addBlocked(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        blocked: {
          connect: { id },
        },
      },
      include: {
        blocked: true,
      },
    });
  }

  async findBlocked(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { blocked: true },
    });
  }

  async deleteBlocked(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        blocked: {
          disconnect: { id: myId },
        },
      },
      include: {
        blocked: true,
      },
    });
  }

  async addOwnChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        own_channels: {
          connect: { id },
        },
      },
      include: {
        own_channels: true,
      },
    });
  }

  async findOwnChannels(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { own_channels: true },
    });
  }

  async deleteOwnChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        own_channels: {
          disconnect: { id },
        },
      },
      include: {
        own_channels: true,
      },
    });
  }

  async addMemberChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        member_channels: {
          connect: { id },
        },
      },
      include: {
        member_channels: true,
      },
    });
  }

  async findMemberChannels(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { member_channels: true },
    });
  }

  async deleteMemberChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        member_channels: {
          disconnect: { id },
        },
      },
      include: {
        member_channels: true,
      },
    });
  }

  async addAdminChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        admin_channels: {
          connect: { id },
        },
      },
      include: {
        admin_channels: true,
      },
    });
  }

  async findAdminChannels(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { admin_channels: true },
    });
  }

  async deleteAdminChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        admin_channels: {
          disconnect: { id },
        },
      },
      include: {
        admin_channels: true,
      },
    });
  }

  async addBannedChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        banned_channels: {
          connect: { id },
        },
      },
      include: {
        banned_channels: true,
      },
    });
  }

  async findBannedChannels(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { banned_channels: true },
    });
  }

  async deleteBannedChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        banned_channels: {
          disconnect: { id },
        },
      },
      include: {
        banned_channels: true,
      },
    });
  }

  async addMutedChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        muted_channels: {
          connect: { id },
        },
      },
      include: {
        muted_channels: true,
      },
    });
  }

  async findMutedChannels(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { muted_channels: true },
    });
  }

  async deleteMutedChannel(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        muted_channels: {
          disconnect: { id },
        },
      },
      include: {
        muted_channels: true,
      },
    });
  }

  async addChatInvite(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        chat_invites: {
          connect: { id },
        },
      },
      include: {
        chat_invites: true,
      },
    });
  }

  async findChatInvites(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { chat_invites: true },
    });
  }

  async deleteChatInvite(id: number, myId: number) {
    return await this.prisma.user.update({
      where: { id: myId },
      data: {
        chat_invites: {
          disconnect: { id },
        },
      },
      include: {
        chat_invites: true,
      },
    });
  }
}
