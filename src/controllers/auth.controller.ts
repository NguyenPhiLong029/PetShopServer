import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import { Public } from 'src/decorators/auth.decorator';
import LoginDto from 'src/dto/login.dto';
import RegisterDto from 'src/dto/register.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  async login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Public()
  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    return await this.userService.create(payload);
  }

  @Get('/profile/:id')
  getProfile(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  async get() {
    return await this.userService.getAll();
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return await this.userService.delete(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() payload: RegisterDto) {
    return await this.userService.update(id, payload);
  }
}
