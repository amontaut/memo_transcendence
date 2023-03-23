import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from "@prisma/client";
import { gameConstants } from './game.constants';

@Injectable()
export class GameService {
  constructor (private prisma: PrismaService) {}
  
  async create(createGameDto: CreateGameDto, myId: number) {
    return await this.prisma.game.create({
      data: {
        mode: createGameDto.mode,
        player_one: {
          connect: { id: myId },
        },
      },
      include: {
        player_one: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.game.findMany({
      include: {
        player_one: true,
        player_two: true,
        winner: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.game.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    return await this.prisma.game.update({
      where: { id },
      data: updateGameDto,

    });
  }

  async addPlayer(id: number, playerId: number) {
    return await this.prisma.game.update({
      where: { id },
      data: {
        player_two: {
          connect: { id: playerId },
        },
      },
      include: {
        player_one: true,
        player_two: true,
      },
    });
  }

  async addPointPlayerOne(id: number) {
    const thisGame = await this.prisma.game.findUnique({
      where: { id },
    });
    if (thisGame.status === Status.ENDED) {
      return console.error("This game was finished.");
    };
    const newPoints = thisGame.player_onePoints + 1;
    if (newPoints == gameConstants.maxScore) {
      return await this.prisma.game.update({
        where: { id },
        data: {
          player_onePoints: newPoints,
          status: Status.ENDED,
          winner: {
            connect: { id: thisGame.player_oneId },
          },
        },
        include: {
          winner: true,
        },
      });
    } else {
      return await this.prisma.game.update({
        where: { id },
        data: {
          player_onePoints: newPoints,
        },
      });
    };
  } 

  async addPointPlayerTwo(id: number) {
    const thisGame = await this.prisma.game.findUnique({
      where: { id },
    });
    if (thisGame.status === Status.ENDED) {
      return console.error("This game was finished.");
    };
    const newPoints = thisGame.player_twoPoints + 1;
    if (newPoints == gameConstants.maxScore) {
      return await this.prisma.game.update({
        where: { id },
        data: {
          player_twoPoints: newPoints,
          status: Status.ENDED,
          winner: {
            connect: { id: thisGame.player_twoId },
          },
        },
        include: {
          winner: true,
        },
      });
    } else {
      return await this.prisma.game.update({
        where: { id },
        data: {
          player_twoPoints: newPoints,
        },
      });
    };
  } 

  async remove(id: number) {
    return await this.prisma.game.delete({
      where: { id },
    });
  }
}
