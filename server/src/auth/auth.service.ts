import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Auth, google } from 'googleapis';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    const clientID = process.env.GOOGLE_AUTH_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(data: LoginDto) {
    const user = await this.userService.getByEmail(data.email);

    await this.verifyPassword(data.password, user.password);

    const token = await this.jwtTokenGenerate(user);

    return {
      user,
      token,
    };
  }

  async register(data: CreateUserDto) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...data,
        password: hashPassword,
      });
      createdUser.password = undefined;
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyPassword(plainTextPassword: string, hashPassword: string) {
    const match = await bcrypt.compare(plainTextPassword, hashPassword);
    if (!match) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async jwtTokenGenerate(user: User): Promise<string> {
    const payload = { username: user, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async authenticateWithGoogle(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    const user = await this.userService.getByEmail(email);

    const jwt = await this.jwtTokenGenerate(user);

    const authUser: AuthUserDto = {
      user,
      token: jwt,
    };

    return authUser;
  }

  async registerWithGoogle(token: string) {
    const userInfo = await this.getUserData(token);

    const userData = {
      username: userInfo.name ?? userInfo.email,
      email: userInfo.email,
    };
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfo = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfo.data;
  }
}
