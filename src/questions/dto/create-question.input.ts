import { BaseQuestionInput } from "./base-question.input";

export class CreateQuestionInput extends BaseQuestionInput {
  id?: string;
  createdAt: Date;
}
