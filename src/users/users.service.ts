import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashingPassWord } from 'src/utils';

interface UserModel extends Model<UserDocument> {
  
}

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: UserModel){};

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await hashingPassWord(createUserDto.password);

      const newUser = new this.userModel({ ...createUserDto, password: hashPassword });
      const result = await newUser.save();

      return { data: result };
    } catch(err) {
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }

  async findAll(filter?: object) {
    try {
      const listUsers = await this.userModel.find({...filter});
      return { data: listUsers };
    } catch(err) {
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userModel.findOne({ _id: id });
      return { data: user };
    } catch(err) {
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
      return { data: result };
    } catch(err) {
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }

  // async delete(ids: number[]) {
  //   try {
  //     await this.userModel.delete({ _id: { $in: ids } });
  //     return 'Delete successful !!!'
  //   } catch(err) {
  //     throw new HttpException(err, HttpStatus.FORBIDDEN);
  //   }
  // }
  
  // async restore(ids: number[]) {
  //   try {
  //     const listUser = await this.userModel.restore({ _id: { $in: ids } });
  //     return { users: listUser };
  //   } catch(err) {
  //     throw new HttpException(err, HttpStatus.FORBIDDEN);
  //   }
  // }

  async remove(ids: number[]) {
    try {
      await this.userModel.deleteOne({ _id: { $in: ids } })
      return 'this user is complete deleted !!!'
    } catch(err) {
      throw new HttpException(err, HttpStatus.FORBIDDEN);
    }
  }
}
