import { IsEmail, Length, min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Length(1, 10)
  username: string;

  @Length(5, 10)
  password: string;
}
