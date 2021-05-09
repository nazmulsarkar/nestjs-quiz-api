import { Document } from 'mongoose';

export interface Answer extends Document {
    readonly title: string;
    readonly description: string;
    readonly questionId: string;
    readonly answerBy: {
        id: string;
        username: string;
        email: string;
        displayName: string;
    };
    readonly createdAt: Date;
    readonly updatedAt: Date;
}