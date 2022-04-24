import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { ISignIn, ISignUp } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async signIn(@Body() body: ISignIn) {
    return this.authService.login(body);
  }
  @Post('/signup')
  async signup(@Body() body: ISignUp) {
    return this.authService.signup(body);
  }
}
