import { BaseUserInput } from "./base-user.input";

export class UpdateUserInput extends BaseUserInput {
  id?: string;
  updatedAt: Date;
}
