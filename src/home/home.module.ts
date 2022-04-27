import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
