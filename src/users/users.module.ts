import { Module } from '@nestjs/common';
// import * as mongooseDelete from 'mongoose-delete';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {name: User.name, useFactory: () => {
        const schema = UserSchema;
        // schema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
        return schema;
    }}
])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
