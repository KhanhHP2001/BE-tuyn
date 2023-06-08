import { User } from 'src/users/entities/user.entity';
declare const AuthLoginDto_base: import("@nestjs/mapped-types").MappedType<Pick<User, "email" | "password">>;
export declare class AuthLoginDto extends AuthLoginDto_base {
}
export {};
