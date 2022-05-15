import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubUserResDto } from './github-user-res.dto';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'code',
      passwordField: 'code',
    });
  }

  // Validate the user at the time of login, and return the user data if valid
  // noinspection JSUnusedGlobalSymbols
  async validate(code: string): Promise<GithubUserResDto> {
    console.log('validate', code);
    try {
      const access_token = await this.authService.exchangeToken(code);
      return await this.authService.getUserInfoGithub(access_token);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
