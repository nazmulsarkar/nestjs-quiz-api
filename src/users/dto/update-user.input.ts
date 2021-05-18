import { BaseUserInput } from "./base-user.input";

export class UpdateUserInput {
  id?: string;
  email?: string;
  username?: string;
  displayName?: string;
  roles?: string[];
  updatedAt: string = new Date().toISOString();
}
