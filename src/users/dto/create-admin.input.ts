import { BaseUserInput } from "./base-user.input";

export class CreateAdminInput extends BaseUserInput {
  id?: string;
  roles: string[] = ['admin', 'anonymous'];
  createdAt: string = new Date().toISOString();
  updatedAt: string = new Date().toISOString();
}
