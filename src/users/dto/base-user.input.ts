export class BaseUserInput {
  email: string;
  password?: string;
  passwordHash: string;
  username?: string;
  displayName?: string;
  roles: string[];
}
