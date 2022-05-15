import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

export class RepoAlreadyExistsError extends Error {
  constructor() {
    super('Repo already exists');
  }
}

export class UnAuthorizedError extends Error {
  constructor() {
    super('Token is not valid');
  }
}

@Injectable()
export class GithubService {
  constructor(private readonly userService: UserService) {}

  // Create Repo using GitHub access token
  async createRepo(
    github_token: string,
    repoName: string,
    private_repo: boolean,
  ): Promise<
    RestEndpointMethodTypes['repos']['createForAuthenticatedUser']['response']['data']
  > {
    const octokit = new Octokit({
      auth: github_token,
    });
    try {
      const { data } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        private: private_repo,
      });
      return data;
    } catch (error) {
      if (error.status === 422) {
        throw new RepoAlreadyExistsError();
      } else if (error.status === 401) {
        throw new UnAuthorizedError();
      }
      throw error;
    }
  }

  // Create Repo from userId
  async createRepoFromUserId(
    userId: number,
    repoName: string,
    privateRepo = true,
  ): Promise<
    RestEndpointMethodTypes['repos']['createForAuthenticatedUser']['response']['data']
  > {
    const { github_token } = await this.userService.findOne(userId);
    return await this.createRepo(github_token, repoName, privateRepo);
  }
}
