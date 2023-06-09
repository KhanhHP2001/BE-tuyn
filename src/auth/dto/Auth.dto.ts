import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class AuthLoginDto extends PickType(CreateUserDto, ['email', 'password']) {}

export class AuthSignupDto extends CreateUserDto {}