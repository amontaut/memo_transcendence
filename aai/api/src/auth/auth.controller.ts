  import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
  import { FortyTwoAuthGuard } from './guards/school.guards';
  import { Response } from 'express';
  import { AuthService } from './auth.service';
  

  @Controller('auth')
  export class AuthController {
    constructor( private readonly authService: AuthService ) {}

    @UseGuards(FortyTwoAuthGuard)
    @Get('/redirect')
    async createToken(
      @Req() req: any,
      @Res({ passthrough: true }) response: Response,
    ) {
      const payload = await this.authService.login(req.user);
      response.cookie('access_token', payload.access_token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 10),
      });
    }
  
    @UseGuards(FortyTwoAuthGuard)  
    @Get('profile')
    async getProfile(@Req() req: any) {
      return req.user;
    }
  
    @Get('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
      response.clearCookie('access_token');
      return {
        message: 'Success',
      };
    }
  }