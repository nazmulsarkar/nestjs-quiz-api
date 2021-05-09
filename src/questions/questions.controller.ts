import { QuestionsService } from './questions.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { FilterQuestionInput } from './dto/filter-question.input';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Question } from './interfaces/question.interface';
import { AuthGuard } from '@nestjs/passport';
// import { JwtAdminAuthGuard } from 'src/auth/guards/jwt-admin-auth.guard';

@Controller('api/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async createQuestion(@Body('createQuestionInput') createQuestionInput: CreateQuestionInput): Promise<CreateQuestionInput> {
    return this.questionsService.create(createQuestionInput);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async questions(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Post('/filtered')
  @UseGuards(AuthGuard('jwt'))
  async questionList(@Body('filters') filters?: FilterQuestionInput): Promise<Question[]> {
    return this.questionsService.list(filters);
  }

  @Post('/:id')
  @UseGuards(AuthGuard('jwt'))
  async findQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionsService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateQuestion(@Param('id') id: string, @Body('updateModel') updateModel: UpdateQuestionInput): Promise<Question> {
    return this.questionsService.update(id, updateModel);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async removeQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionsService.remove(id);
  }
}
