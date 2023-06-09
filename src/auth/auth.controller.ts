import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignupDto } from './dto/Auth.dto';
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
  async registerUser(@Body() createUser : AuthSignupDto) {
    return this.authService.signUp(createUser);
  }
}