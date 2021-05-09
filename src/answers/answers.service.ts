import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginAuthInput } from 'src/auth/dto/login-auth.input';
import { CreateAnswerInput } from './dto/create-answer.input';
import { FilterAnswerInput } from './dto/filter-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './interfaces/answer.interface';

@Injectable()
export class AnswersService {
  constructor(@InjectModel('Answer') private answerModel: Model<Answer>) { }
  async create(createAnswerInput: CreateAnswerInput): Promise<CreateAnswerInput> {
    const createdAnswer = new this.answerModel(createAnswerInput);
    return await createdAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    return await this.answerModel.find().exec();
  }

  async list(filters: FilterAnswerInput): Promise<Answer[]> {
    return this.answerModel.find({ ...filters }).exec();
  }

  async findOne(id: string): Promise<Answer> {
    return await this.answerModel.findOne({ _id: id });
  }

  async findOneBy(loginAuthInput: LoginAuthInput): Promise<CreateAnswerInput> {
    return await this.answerModel.findOne(loginAuthInput);
  }

  async update(id: string, updateAnswerInput: UpdateAnswerInput): Promise<Answer> {
    return await this.answerModel.findByIdAndUpdate(id, updateAnswerInput, { new: true });
  }

  async remove(id: string): Promise<Answer> {
    return await this.answerModel.findByIdAndRemove(id);
  }
}
