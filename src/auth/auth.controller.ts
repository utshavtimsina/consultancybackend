import { Body, Controller, Get, Post } from '@nestjs/common';
import { databaseConfig } from 'src/config/orm.config';
import { AuthService } from './auth.service';
import { ISignIn, ISignUp } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}  
  @Post('/login')
  async signIn(@Body() body: ISignIn) {
    return {
      message: 'ok',
    };
  }
  @Post('/signup')
  async signup(@Body() body: ISignUp) {
    return this.authService.signup(body);
  }
}
