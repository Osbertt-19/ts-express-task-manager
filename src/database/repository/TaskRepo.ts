import { Types } from 'mongoose';
import Task, { TaskModel } from '../model/Task';
export default class TaskRepo {
  public static async findByUser(id: Types.ObjectId): Promise<Task[]> {
    return await TaskModel.find({ user: id, status: true }).lean().exec();
  }
  public static async findRecentlyDeleted(id: Types.ObjectId): Promise<Task[]> {
    return await TaskModel.find({ user: id, status: false }).lean().exec();
  }
  public static async create(task: Task): Promise<Task> {
    const createdTask = await TaskModel.create(task);
    return createdTask.toObject();
  }
  public static async getTaskByID(id: Types.ObjectId): Promise<Task | null> {
    return await TaskModel.findOne({ _id: id, status: true }).lean().exec();
  }
  public static async getDeletedTaskByID(id: Types.ObjectId): Promise<Task | null> {
    return await TaskModel.findOne({ _id: id, status: true }).lean().exec();
  }
  public static async update(task: Task): Promise<Task | null> {
    return await TaskModel.findByIdAndUpdate(task._id, task, { new: true }).lean().exec();
  }
  public static async permanentDelete(id: Types.ObjectId): Promise<Task | null> {
    return await TaskModel.findByIdAndRemove(id).lean().exec();
  }
}
