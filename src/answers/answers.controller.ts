import { AnswersService } from './answers.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { FilterAnswerInput } from './dto/filter-answer.input';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Answer } from './interfaces/answer.interface';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/interfaces/user.interface';
// import { JwtAdminAuthGuard } from 'src/auth/guards/jwt-admin-auth.guard';

@Controller('api/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) { }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async createAnswer(@Body('modelData') modelData: CreateAnswerInput, @Req() req): Promise<CreateAnswerInput> {
    const { id, username, email, displayName } = req.user;
    const answerBy = { id: id, username: username, email: email, displayName: displayName };
    return this.answersService.create(modelData);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async answers(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  @Post('/filtered')
  @UseGuards(AuthGuard('jwt'))
  async answerList(@Body('filters') filters?: FilterAnswerInput): Promise<Answer[]> {
    return this.answersService.list(filters);
  }

  @Post('/:id')
  @UseGuards(AuthGuard('jwt'))
  async findAnswer(@Param('id') id: string): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateAnswer(@Param('id') id: string, @Body('modelData') modelData: UpdateAnswerInput): Promise<Answer> {
    return this.answersService.update(id, modelData);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async removeAnswer(@Param('id') id: string): Promise<Answer> {
    return this.answersService.remove(id);
  }
}
