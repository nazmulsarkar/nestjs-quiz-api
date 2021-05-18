import { BaseUserInput } from "./base-user.input";

export class CreateUserInput extends BaseUserInput {
  id?: string;
  roles: string[] = ['user', 'anonymous'];
  createdAt: string = new Date().toISOString();
  updatedAt: string = new Date().toISOString();
}
