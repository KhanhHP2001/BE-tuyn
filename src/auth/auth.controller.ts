import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthLoginDto } from './dto/Auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() loginData : AuthLoginDto) {
    return this.authService.login(loginData);
  }

  @Post('signup')
  async registerUser(@Body() createUser : CreateUserDto) {
    return this.authService.signUp(createUser);
  }
}