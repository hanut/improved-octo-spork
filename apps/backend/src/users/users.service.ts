import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  find(page = 1, limit = 10) {
    return this.userModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
