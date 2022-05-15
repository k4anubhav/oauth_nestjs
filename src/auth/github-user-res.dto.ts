import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class GithubUserResDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  login: string;
}

export class GithubUserResDtoWithToken extends GithubUserResDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
