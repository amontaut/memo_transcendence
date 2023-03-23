import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local.guards';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt.guards';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
