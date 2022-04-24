import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { Repository } from 'typeorm';
import { ISignIn, ISignUp } from './dto/auth.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  async login(body: ISignIn) {}

  async signup(body: ISignUp) {
    try {
      const tuple = this.adminRepository.create({ ...body });
      await this.adminRepository.save(tuple);
      return { message: 'User has been created successfully' };
    } catch (error) {
      throw new InternalServerErrorException("Couldn't create user");
    }
  }
}
