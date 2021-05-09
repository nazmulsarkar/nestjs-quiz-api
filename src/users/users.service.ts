import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { FilterUserInput } from './dto/filter-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './interfaces/user.interface';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(@InjectModel('User') private userModel: Model<User>) { }
  async create(createUserInput: CreateUserInput): Promise<CreateUserInput> {
    createUserInput.passwordHash = await this.getHash(createUserInput.password);
    // clear  password as we don't persist passwords
    createUserInput.password = undefined;
    const createdUser = new this.userModel(createUserInput);
    return await createdUser.save();
  }

  async findAll(): Promise<CreateUserInput[]> {
    return await this.userModel.find().exec();
  }

  async list(filters: FilterUserInput): Promise<CreateUserInput[]> {
    return this.userModel.find({ ...filters }).exec();
  }

  async findOne(id: string): Promise<CreateUserInput> {
    return await this.userModel.findOne({ _id: id });
  }

  async findOneBy(filters: FilterUserInput): Promise<CreateUserInput> {
    return await this.userModel.findOne(filters).exec();
  }

  async getUserByEmail(email: string): Promise<CreateUserInput> {
    return (await this.userModel.find({ email }))[0];
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<UpdateUserInput> {
    return await this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  async remove(id: string): Promise<CreateUserInput> {
    return await this.userModel.findByIdAndRemove(id);
  }

  private async getHash(password: string | undefined): Promise<string> {
    return argon2.hash(password);
  }

  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    try {
      if (await argon2.verify(hash, password)) {
        this.logger.log('verification of user sucessful');
        return true;
      } else {
        this.logger.log('verification failed');
        return false;
      }
    } catch (err) {
      this.logger.log('argon2 error');
      return false;
    }
  }
}
