import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsSchema } from './questions.schema';
import { QuestionsController } from './questions.controller';

@Module({
  providers: [QuestionsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionsSchema }])
  ],
  controllers: [QuestionsController],
})
export class QuestionsModule { }
