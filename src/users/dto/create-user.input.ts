import { BaseUserInput } from "./base-user.input";

export class CreateUserInput extends BaseUserInput {
  id?: string;
  createdAt: Date;
}
