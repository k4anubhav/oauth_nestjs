import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

// Create Repo DTO
export class CreateRepoDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsBoolean()
  readonly private: boolean = false;
}
