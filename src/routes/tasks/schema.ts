import Joi from 'joi';
import { JoiObjectId } from '../../helpers/validator';

export default {
  getTask: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  taskInfo: Joi.object().keys({
    title: Joi.string().required(),
    note: Joi.string().optional(),
    category: Joi.string().uppercase().optional(),
    deadline: Joi.date(),
  }),
};
