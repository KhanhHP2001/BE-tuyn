import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthLoginDto } from './dto/Auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { comparePassword, jsonWebToken } from 'src/utils';

interface UserModel extends Model<UserDocument> {
  // delete: any;
  // restore: any;
}

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: UserModel,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    // private readonly mailerService: MailerService,
  ) {}

  // sign up action
  async signUp(createUser: CreateUserDto) {
    try {
      return this.userService.create(createUser);
    } catch(err) {
      throw new HttpException(err, 400);
    }
  }

  // login action for the user
  async login(loginData: AuthLoginDto) {
    try {
      const { email, password } = loginData;
      const userData = await this.userModel.findOne({ email });
      const isUser = await comparePassword(password, userData.password);

      if (!isUser) throw new HttpException('Incorrect password !!!', 400);

      const token = await this.convertToJwtString(
        userData.id,
        userData.name,
        userData.email,
      );

      return { token, user: userData };
    } catch (err) {
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }

  // jwt verify
  async verifyJwt(
    token: string,
  ): Promise<{ userId: string; userName: string; email: string }> {
    try {
      const result = await this.jwtService.verify(token, {
        secret: jsonWebToken.secretKey,
      });
      const userInf = await this.userModel.findOne({ email: result?.email });
      if (!userInf) throw new UnauthorizedException();
      return result;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  // jwt generator
  async convertToJwtString(
    userId: string,
    userName: string,
    email: string,
  ): Promise<string> {
    const payload = { sub: userId, username: userName, email };
    return this.jwtService.signAsync(payload, {
      expiresIn: jsonWebToken.expiredTime,
      secret: jsonWebToken.secretKey,
    });
  }
}
