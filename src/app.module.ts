import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { StudyModule } from './study/study.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ConfigModule.forRoot({ load: [databaseConfig] }),
    // TypeOrmModule.forRoot({...databaseConfig()}),
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '..', 'upload'),
    // }),
    AuthModule,
    HomeModule,
    StudyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {console.log(path.join(__dirname, '..', 'upload'));
  }
}
