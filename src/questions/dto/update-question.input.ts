import { BaseQuestionInput } from "./base-question.input";

export class UpdateQuestionInput extends BaseQuestionInput {
  id?: string;
  updatedAt: string;
}
