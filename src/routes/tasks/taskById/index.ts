import { Router } from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from '../schema';
import asyncHandler from '../../../helpers/asyncHandler';
import { ProtectedRequest } from '../../../types/app-request';
import TaskRepo from '../../../database/repository/TaskRepo';
import { SuccessResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError';
import { Types } from 'mongoose';

const router = Router();
router.use(validator(schema.getTask, ValidationSource.PARAM));

router.get(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.getTaskByID(new Types.ObjectId(req.params.id));
    if (!task) throw new BadRequestError('task with such id does not exist');
    return new SuccessResponse('success', task).send(res);
  }),
);
router.patch(
  '/',
  validator(schema.taskInfo),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.getTaskByID(new Types.ObjectId(req.params.id));
    if (!task) throw new BadRequestError('task with such id does not exist');
    if (req.body.title) task.title = req.body.title;
    if (req.body.note) task.note = req.body.note;
    if (req.body.category) task.category = req.body.category;
    if (req.body.deadline) task.deadline = req.body.deadline;
    await TaskRepo.update(task);
    return new SuccessResponse('success', task).send(res);
  }),
);
router.patch(
  '/completed',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.getTaskByID(new Types.ObjectId(req.params.id));
    if (!task) throw new BadRequestError('task with such id does not exist');
    task.completed = true;
    await TaskRepo.update(task);
    return new SuccessResponse('success', task).send(res);
  }),
);
router.delete(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.getTaskByID(new Types.ObjectId(req.params.id));
    if (!task) throw new BadRequestError('task with such id does not exist');
    task.status = false;
    await TaskRepo.update(task);
    return new SuccessResponse('success', task).send(res);
  }),
);
router.delete(
  '/permanent',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.getTaskByID(new Types.ObjectId(req.params.id));
    if (!task) throw new BadRequestError('task with such id does not exist');
    await TaskRepo.permanentDelete(task._id);
    return new SuccessResponse('success', task).send(res);
  }),
);
router.patch(
  '/recover',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const task = await TaskRepo.getDeletedTaskByID(new Types.ObjectId(req.params.id));
    if (!task) {
      const recoveredTask = await TaskRepo.getTaskByID(new Types.ObjectId(req.params.id));
      if (!recoveredTask) throw new BadRequestError('the task is already recovered');
      throw new BadRequestError('task with such id does not exist');
    }
    task.status = true;
    await TaskRepo.update(task);
    return new SuccessResponse('success', task).send(res);
  }),
);
export default router;
