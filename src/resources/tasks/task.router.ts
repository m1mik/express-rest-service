import express, { Request } from 'express';
import { body } from 'express-validator';
import { validate } from '../../helpers';
import {
  getAll,
  getById,
  createTask,
  deleteById,
  updateTask,
} from './task.service';
import loggerActor from '../../logger';
import Task from './task.model';
import { CustomError } from '../../types';

const router = express.Router({ mergeParams: true });
router.get('/', loggerActor, async (_req: Request, res) => {
  const users = getAll();
  res.json(users);
});

router.get('/:id', loggerActor, async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = getById(id as string);
    if (task) return res.status(200).json(task);
    throw new CustomError(404, `There is no task with such (${id}) id.`);
  } catch (e) {
    next(e);
  }
  return {};
});

router.post(
  '/',
  loggerActor,
  body('title').exists(),
  body('order').isNumeric(),
  validate,
  (req, res) => {
    const boardId = `${req.baseUrl}`.split('/')[2];
    res.status(201).json(
      createTask({
        description: 'Lorem ipsum',
        ...req.body,
        boardId,
      })
    );
  }
);

router.delete('/:id', loggerActor, async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    const result: Task = deleteById(id as string);
    return res.status(200).json({ message: result });
  } catch (e) {
    next(e);
  }
  return {};
});

router.put('/:id', loggerActor, async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    const result: Task = updateTask({
      ...req.body,
      id,
    });
    return res.status(200).json({ message: result });
  } catch (e) {
    next(e);
  }
  return {};
});

export default router;
