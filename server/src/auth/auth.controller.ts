import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.authService.registerUser(data);
  }

  @Post('/login')
  login(@Body() data: LoginDto) {
    return this.authService.authenticate(data);
  }
}
