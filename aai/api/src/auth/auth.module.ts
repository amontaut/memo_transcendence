import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FortyTwoStrategy } from './strategies/school.strategy';
import { SessionSerializer } from './session.serializer'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [AuthService, FortyTwoStrategy, LocalStrategy, JwtStrategy, SessionSerializer],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
