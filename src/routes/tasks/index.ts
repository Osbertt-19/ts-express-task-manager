import { Router } from 'express';
import authentication from '../../auth/authentication';
import validator from '../../helpers/validator';
import schema from './schema';
import taskById from './taskById';
import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from '../../types/app-request';
import TaskRepo from '../../database/repository/TaskRepo';
import Task from '../../database/model/Task';
import { SuccessResponse } from '../../core/ApiResponse';
const router = Router();

router.use(authentication);

router.post(
  '/',
  validator(schema.taskInfo),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const createdTask = await TaskRepo.create({
      title: req.body.title,
      note: req.body.note,
      category: req.body.category,
      deadline: req.body.deadline,
      user: req.user,
    } as Task);
    return new SuccessResponse('Task created successfully', createdTask).send(res);
  }),
);
router.get(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const tasks = await TaskRepo.findByUser(req.user._id);
    return new SuccessResponse('success', tasks).send(res);
  }),
);
router.get(
  '/recently-deleted',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const tasks = await TaskRepo.findRecentlyDeleted(req.user._id);
    return new SuccessResponse('success', tasks).send(res);
  }),
);
router.use('/:id', taskById);

export default router;
