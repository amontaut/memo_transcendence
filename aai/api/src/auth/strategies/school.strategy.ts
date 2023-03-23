import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy, Profile } from 'passport-42';


@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FORTYTWO_CLIENT,
      clientSecret: process.env.FORTYTWO_SECRET,
      callbackURL: process.env.FORTYTWO_CALLBACK_URL,
      passReqToCallback: true,

    });
  }

  async validate(
    request: { session: { accessToken: string }},
    accessToken: string, 
    refreshToken: string, 
    profile: Profile,
  ): Promise<any> {
    request.session.accessToken = accessToken;
    console.log('accessToken', accessToken, 'refreshToken', refreshToken);
    //console.log(profile)
    const user = {
      id42: profile.username,
      username: profile.username,
      avatar: profile._json.image.link,
      password: '',
    };
    console.log("User", user);
    return this.authService.findOrCreateSchool(user);
  }
}