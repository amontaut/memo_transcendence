import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';

@Controller('game')
@ApiTags('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGameDto: CreateGameDto, @Request() req: any) {
    const myId = req.user.id;
    return this.gameService.create(createGameDto, myId);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(+id, updateGameDto);
  }

  @Post(':id/add_player')
  addPlayer(@Param('id') id: string, @Body() param: { playerId: string }) {
    return this.gameService.addPlayer(+id, +param.playerId);
  }

  @Post(':id/point_to_player_one')
  addPointPlayerOne(@Param('id') id: string) {
    return this.gameService.addPointPlayerOne(+id);
  }

  @Post(':id/point_to_player_two')
  addPointPlayerTwo(@Param('id') id: string) {
    return this.gameService.addPointPlayerTwo(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
