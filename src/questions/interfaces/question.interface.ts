import { Document } from 'mongoose';

export interface Question extends Document {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}