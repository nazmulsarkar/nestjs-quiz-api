import { BaseAnswerInput } from "./base-answer.input";

export class CreateAnswerInput extends BaseAnswerInput {
  id?: string;
  createdAt: Date;
  questionId: string;
  answerBy: {
    id: string;
    username: string;
    email: string;
    displayName: string;
  };
}
