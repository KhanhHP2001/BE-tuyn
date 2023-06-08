// import * as mongooseDelete from 'mongoose-delete';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [MongooseModule.forFeatureAsync([
          {name: User.name, useFactory: () => {
              const schema = UserSchema;
              // schema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
              return schema;
          }}
      ]),
      JwtModule.register({}),
    ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
