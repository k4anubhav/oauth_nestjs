import { IsString, IsNotEmpty, Contains } from 'class-validator';
import * as assert from 'assert';

const SCOPE = process.env.SCOPE;
assert(typeof process.env.SCOPE === 'string');

// Data transfer object for response of GitHub access token from GitHub
export class GithubAccessTokenResDto {
  @IsNotEmpty()
  @IsString()
  readonly access_token: string;

  @IsNotEmpty()
  @Contains(SCOPE)
  readonly scope: string;

  @IsNotEmpty()
  @IsString()
  readonly token_type: string;
}
