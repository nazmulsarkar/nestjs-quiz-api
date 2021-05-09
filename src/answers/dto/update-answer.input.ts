import { BaseAnswerInput } from "./base-answer.input";

export class UpdateAnswerInput extends BaseAnswerInput {
  id?: string;
  updatedAt: Date;
  questionId?: string;
}
