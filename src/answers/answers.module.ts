import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersSchema } from './answers.schema';
import { AnswersController } from './answers.controller';

@Module({
  providers: [AnswersService],
  imports: [
    MongooseModule.forFeature([{ name: 'Answer', schema: AnswersSchema }])
  ],
  controllers: [AnswersController]
})
export class AnswersModule { }
