import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { StudyModule } from './study/study.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ConfigModule.forRoot({ load: [databaseConfig] }),
    // TypeOrmModule.forRoot({...databaseConfig()}),
    AuthModule,
    HomeModule,
    StudyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
