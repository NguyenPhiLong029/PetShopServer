import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import LoginDto from 'src/dto/login.dto';
import { comparePassword } from 'src/utils/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(payload: LoginDto) {
    const user = await this.usersService.findByEmail(payload.email);
    const isMatch = await comparePassword(payload.password, user?.passwordHash);
    if (isMatch) {
      const { passwordHash, ...result } = user;
      return result;
    }
  }

  async login(payload: LoginDto) {
    const user = await this.validateUser(payload);
    if (!user) {
      throw new NotFoundException();
    }
    return {
      ...user,
      access_token: this.jwtService.sign(user)
    };
  }
}
