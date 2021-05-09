import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginAuthInput } from 'src/auth/dto/login-auth.input';
import { CreateQuestionInput } from './dto/create-question.input';
import { FilterQuestionInput } from './dto/filter-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './interfaces/question.interface';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel('Question') private questionModel: Model<Question>) { }
  async create(createQuestionInput: CreateQuestionInput): Promise<CreateQuestionInput> {
    const createdQuestion = new this.questionModel(createQuestionInput);
    return await createdQuestion.save();
  }

  async findAll(): Promise<Question[]> {
    return await this.questionModel.find().exec();
  }

  async list(filters: FilterQuestionInput): Promise<Question[]> {
    return this.questionModel.find({ ...filters }).exec();
  }

  async findOne(id: string): Promise<Question> {
    return await this.questionModel.findOne({ _id: id });
  }

  async findOneBy(loginAuthInput: LoginAuthInput): Promise<CreateQuestionInput> {
    return await this.questionModel.findOne(loginAuthInput);
  }

  async update(id: string, updateQuestionInput: UpdateQuestionInput): Promise<Question> {
    return await this.questionModel.findByIdAndUpdate(id, updateQuestionInput, { new: true });
  }

  async remove(id: string): Promise<Question> {
    return await this.questionModel.findByIdAndRemove(id);
  }
}
