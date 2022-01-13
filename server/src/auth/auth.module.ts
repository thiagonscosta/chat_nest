import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: '2905886edc9d34b20e35ad7b650ce8c2',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
