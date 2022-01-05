import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('/login')
  login(data: LoginDto) {
    return this.authService.authenticate(data);
  }
}
