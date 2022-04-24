import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import fs from 'fs';
import { dbPathResolver } from 'src/util/common.util';
import authDb from '../db/auth.db.json';
import { ISignIn, ISignUp } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login(body: ISignIn) {
    try {
      if (authDb.username === body.username) {
        if (await compare(body.password, authDb.password)) {
          return {
            xs: this.jwtService.sign({ username: body.username }),
            username: body.username,
            email: authDb.email,
          };
        }
        throw new UnauthorizedException('Invalid username or password.');
      }
      throw new UnauthorizedException('Invalid username or password.');
    } catch (error) {
      throw error;
    }
  }

  async signup(body: ISignUp) {
    try {
      const hashedPassword = await hash(body.password, 10);
      body.password = hashedPassword;
      const dbPath = dbPathResolver('auth.db.json');
      fs.writeFileSync(dbPath, JSON.stringify(body));
      return { message: 'User has been created successfully' };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't create user");
    }
  }
}
