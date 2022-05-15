import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  GithubService,
  RepoAlreadyExistsError,
  UnAuthorizedError,
} from './github.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { CreateRepoDto } from './create-repo.dto';
import { UserNotFoundError, UserService } from '../user/user.service';

@Controller('action/github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly userService: UserService,
  ) {}

  // Create a new repo for the user
  @UseGuards(JwtAuthGuard)
  @Post('create-repo/')
  async createRepo(@Body() createRepoDto: CreateRepoDto, @Request() req: any) {
    console.log(createRepoDto);
    const { name: name, private: isPrivate } = createRepoDto;
    try {
      const repoData = await this.githubService.createRepoFromUserId(
        req.user.userId,
        name,
        isPrivate,
      );
      return {
        url: repoData.html_url,
        name: repoData.name,
      };
    } catch (e) {
      if (e instanceof RepoAlreadyExistsError) {
        return {
          error: 'Repo already exists',
        };
      } else if (e instanceof UnAuthorizedError) {
        // just delete the user, and create new one when user login again cause there is no any other data that we want to keep
        await this.userService.delete(req.user.userId);
        return {
          error: 'Unauthorized',
        };
      } else if (e instanceof UserNotFoundError) {
        return {
          error: 'User not found',
        };
      } else {
        throw e;
      }
    }
  }
}
