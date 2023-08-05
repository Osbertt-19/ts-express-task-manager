import { model, Schema, Types } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'Task';
export const COLLECTION_NAME = 'tasks';

export default interface Task {
  _id: Types.ObjectId;
  title: string;
  note?: string;
  category?: string;
  user: User;
  deadline: Date;
  completed: boolean;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<Task>(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    note: {
      type: Schema.Types.String,
    },
    category: {
      type: Schema.Types.String,
      trim: true,
      uppercase: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    deadline: {
      type: Schema.Types.Date,
    },
    completed: {
      type: Schema.Types.Boolean,
      default: false,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  { versionKey: false },
);
schema.index({ category: 1, status: 1 });
export const TaskModel = model<Task>(DOCUMENT_NAME, schema, COLLECTION_NAME);
