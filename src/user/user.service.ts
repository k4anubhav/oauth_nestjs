import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await Promise.resolve(this.userRepository.findOne(id));
    if (!user) {
      throw new UserNotFoundError();
    }
    console.log(user, 'user');
    return user;
  }

  async create(
    id: number,
    username: string,
    github_token: string,
  ): Promise<User> {
    const user = new User();
    user.github_user_id = id;
    user.username = username;
    user.github_token = github_token;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await Promise.resolve(this.userRepository.delete(id));
  }

  async getOrCreateUser(payload: {
    userId: number;
    username: string;
    github_token: string;
  }): Promise<User> {
    try {
      return await this.findOne(payload.userId);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return await this.create(
          payload.userId,
          payload.username,
          payload.github_token,
        );
      }
      throw error;
    }
  }
}
