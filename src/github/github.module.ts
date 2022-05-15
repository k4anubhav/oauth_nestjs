import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [AuthModule],
  controllers: [GithubController],
  providers: [GithubService, JwtStrategy],
})
export class GithubModule {}
