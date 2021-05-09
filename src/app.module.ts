import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/quizdb'),
    AuthModule,
    UsersModule,
    QuestionsModule,
    AnswersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
