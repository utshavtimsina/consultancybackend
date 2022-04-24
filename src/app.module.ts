import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig] }),
    TypeOrmModule.forRoot({...databaseConfig()}),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
