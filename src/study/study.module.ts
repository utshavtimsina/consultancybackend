import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [StudyService],
  controllers: [StudyController],
})
export class StudyModule {}
