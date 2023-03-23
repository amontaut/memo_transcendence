import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [PrismaModule],
  exports: [GameService],
})
export class GameModule {}
