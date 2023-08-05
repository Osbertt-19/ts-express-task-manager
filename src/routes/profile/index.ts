import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { ProtectedRequest } from '../../types/app-request';
import { BadRequestError } from '../../core/ApiError';
import validator from '../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import _ from 'lodash';
import authentication from '../../auth/authentication';
import TaskRepo from '../../database/repository/TaskRepo';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.get(
  '/my',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findById(req.user._id);
    if (!user) throw new BadRequestError('User not registered');
    const tasks = await TaskRepo.findByUser(req.user._id);
    const data = {
      user: _.pick(user, ['name', 'email', 'profilePicUrl']),
      tasks,
    };
    return new SuccessResponse('success', data).send(res);
  }),
);

router.put(
  '/',
  validator(schema.profile),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findById(req.user._id);
    if (!user) throw new BadRequestError('User not registered');

    if (req.body.name) user.name = req.body.name;
    if (req.body.profilePicUrl) user.profilePicUrl = req.body.profilePicUrl;

    await UserRepo.updateInfo(user);

    const data = _.pick(user, ['name', 'profilePicUrl']);

    return new SuccessResponse('Profile updated', data).send(res);
  }),
);

export default router;
