import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id42: string, password: string): Promise<any> {
    const user = await this.userService.findById42(id42);
    if (user && (await this.validatePassword(password, user))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validatePassword(attempt: string, user: User) {
    if (user.password) {
      return await bcrypt.compare(attempt, user.password);
    } else {
      return false;
    }
  }

  async login(user: any) {
    const payload = { id: user.id, id42: user.id42 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOrCreateSchool(userDto: CreateUserDto) {
    return await this.userService.findOrCreateSchool(userDto);
  }

  getCookieWithJwtAccessToken(id: string, id42: string) {
    const payload = { id, id42 };
    return { access_token: this.jwtService.sign(payload) };
  }

  async verifyJwt(jwtToken: string) {
    return this.jwtService.verifyAsync(jwtToken);
  }

}
