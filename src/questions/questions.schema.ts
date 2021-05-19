import * as mongoose from 'mongoose';

export const QuestionsSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: String,
    updatedAt: String
});