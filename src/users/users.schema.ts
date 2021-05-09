import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    passwordHash: String,
    displayName: String,
    roles: [String],
    createdAt: Date,
    updatedAt: Date
});