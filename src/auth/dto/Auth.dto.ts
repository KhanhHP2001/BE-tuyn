import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';

export class AuthLoginDto extends PickType(User, ['email', 'password']) {}