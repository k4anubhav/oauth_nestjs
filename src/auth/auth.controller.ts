import { Controller, Get, UseGuards, Request, Res, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubOauthGuard } from './github-oauth.guard';
import { JwtAuthGuard } from './jwt-auth.gaurd';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // exchange code for access token and return jwt token to client
  @UseGuards(GithubOauthGuard)
  @Post('/auth/github/exchange-code/')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // redirect to GitHub oauth authorization page
  @Get('/auth/github/login/')
  async githubLogin(@Res() res) {
    return res.redirect(this.authService.GITHUB_OAUTH_AUTHORIZE_URL);
  }

  // return user info
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(@Request() req, @Res() res) {
    try {
      // check if user exists in database
      await this.userService.findOne(req.user.id);
      res.status(200).json(req.user);
    } catch (e) {
      res.status(404).json({ message: 'User not found' });
    }
  }
}
