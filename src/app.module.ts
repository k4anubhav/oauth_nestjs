import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // serve static files from the public folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(JSON.parse(process.env.ORM_CONFIG)),
    GithubModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
