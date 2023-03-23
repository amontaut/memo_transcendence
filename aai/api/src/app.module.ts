import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChannelsModule } from './channels/channels.module';
import { MessageModule } from './message/message.module';
import { GameModule } from './game/game.module';


@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ChannelsModule, MessageModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
