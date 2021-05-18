import { Document } from 'mongoose';

export interface User extends Document {
  readonly username?: string;
  readonly email: string;
  readonly password: string;
  readonly passwordHash: string;
  readonly roles: string[];
  readonly displayName: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
