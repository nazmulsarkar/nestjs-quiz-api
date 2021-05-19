import { QuestionsService } from './questions.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { FilterQuestionInput } from './dto/filter-question.input';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Question } from './interfaces/question.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async createQuestion(@Body('title') title: string, @Body('description') description: string): Promise<CreateQuestionInput> {
    return this.questionsService.create(title, description);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async questions(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Post('/filtered')
  @UseGuards(AuthGuard('jwt'))
  async questionList(@Res() res, @Body('filters') filters?: FilterQuestionInput, @Body('page') page?: number, @Body('limit') limit?: number): Promise<Question[]> {
    const pageNumber = page || 1;
    const sizeLimit = limit || 10;
    const items = await this.questionsService.list(filters, pageNumber, sizeLimit);
    return res.status(HttpStatus.OK).json({ questions: items, questionCount: items.length });
  }

  @Post('/:id')
  @UseGuards(AuthGuard('jwt'))
  async findQuestion(@Res() res, @Param('id') id: string): Promise<Question> {
    return res.status(HttpStatus.OK).json(await this.questionsService.findOne(id));
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
