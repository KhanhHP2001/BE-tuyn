import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from './utils';
import { JWTStrategy } from './utils/strategies/jwt.strategy';

@Module({
  imports: [MongooseModule.forRoot(database.dbAdress), UsersModule, AuthModule],
  providers: [JWTStrategy],
})
export class AppModule {}
