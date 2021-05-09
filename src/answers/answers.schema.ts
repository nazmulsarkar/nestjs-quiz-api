import * as mongoose from 'mongoose';

export const AnswersSchema = new mongoose.Schema({
    title: String,
    description: String,
    questionId: String,
    answerBy: {
        id: String,
        username: String,
        email: String,
        displayName: String,
    },
    createdAt: Date,
    updatedAt: Date,
});