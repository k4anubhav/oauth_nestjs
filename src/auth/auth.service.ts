import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { GithubAccessTokenResDto } from './github-access-token-res.dto';
import { lastValueFrom } from 'rxjs';
import { GithubUserResDtoWithToken } from './github-user-res.dto';
import * as assert from 'assert';
import { Octokit } from '@octokit/rest';

@Injectable()
export class AuthService {
  readonly SCOPE: string;
  readonly GITHUB_OAUTH_CLIENT_ID: string;
  readonly GITHUB_OAUTH_CLIENT_SECRET: string;
  readonly GITHUB_OAUTH_AUTHORIZE_URL: string;

  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {
    assert(typeof process.env.GITHUB_OAUTH_CLIENT_ID === 'string');
    assert(typeof process.env.GITHUB_OAUTH_CLIENT_SECRET === 'string');
    assert(typeof process.env.SCOPE === 'string');
    this.GITHUB_OAUTH_CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
    this.GITHUB_OAUTH_CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;
    this.SCOPE = process.env.SCOPE;

    this.GITHUB_OAUTH_AUTHORIZE_URL = `https://github.com/login/oauth/authorize?client_id=${this.GITHUB_OAUTH_CLIENT_ID}&scope=${this.SCOPE}`;
  }

  // return user info from GitHub using GitHub access token
  async getUserInfoGithub(
    access_token: string,
  ): Promise<GithubUserResDtoWithToken> {
    const octokit = new Octokit({
      auth: access_token,
    });
    const userData = await octokit.users.getAuthenticated();
    return {
      id: userData.data.id,
      login: userData.data.login,
      access_token: access_token,
    };
  }

  // exchange code for access_token
  async exchangeToken(code: string): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.post<GithubAccessTokenResDto>(
          'https://github.com/login/oauth/access_token',
          {
            client_id: this.GITHUB_OAUTH_CLIENT_ID,
            client_secret: this.GITHUB_OAUTH_CLIENT_SECRET,
            code: code,
          },
          {
            headers: {
              Accept: 'application/json',
            },
          },
        ),
      );
      console.log(response);
      const {
        data: { access_token: githubAccessToken },
      } = response;
      return githubAccessToken;
    } catch (error) {
      console.log(error);
      throw new Error('Github API error');
    }
  }

  // login user if exists, or create new user and return jwt token
  async login(userData: GithubUserResDtoWithToken) {
    const user = await this.userService.getOrCreateUser({
      username: userData.login,
      userId: userData.id,
      github_token: userData.access_token,
    });
    return {
      access_token: this.jwtService.sign({
        userId: user.github_user_id,
        username: user.username,
      }),
    };
  }
}
