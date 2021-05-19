import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionInput } from './dto/create-question.input';
import { FilterQuestionInput } from './dto/filter-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './interfaces/question.interface';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel('Question') private questionModel: Model<Question>) { }
    async create(title: string, description: string): Promise<CreateQuestionInput> {
        const question = { title, description, createdAt: new Date().toISOString() }
        const createdQuestion = new this.questionModel(question);
        return await createdQuestion.save();
    }

    async findAll(): Promise<Question[]> {
        return await this.questionModel.find().exec();
    }

    async list(filters: FilterQuestionInput, page: number, limit: number): Promise<any> {
        return await this.questionModel.find({ ...filters })
            .skip(Number(page))
            .limit(Number(limit))
            .exec();
    }

    async findOne(id: string): Promise<Question> {
        return await this.questionModel.findOne({ _id: id });
    }

    async findOneBy(filters: FilterQuestionInput): Promise<CreateQuestionInput> {
        return await this.questionModel.findOne(filters);
    }

    async update(id: string, updateQuestionInput: UpdateQuestionInput): Promise<Question> {
        return await this.questionModel.findByIdAndUpdate(id, updateQuestionInput, { new: true });
    }

    async remove(id: string): Promise<Question> {
        return await this.questionModel.findByIdAndRemove(id);
    }
}
