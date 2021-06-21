import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '../../helpers';
import {
  getAll,
  getById,
  createTask,
  deleteById,
  updateTask,
} from './task.service';
import { CustomError } from '../../types';

const router = express.Router({ mergeParams: true });
router.get('/', async (_req: Request, res) => {
  const users = getAll();
  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = getById(id as string);
    if (task) return res.status(200).json(task);
    throw new CustomError(404, `There is no task with such (${id}) id.`);
  } catch (e) {
    console.log('catch on task get by id');
    next(e);
  }
  return {};
});

router.post(
  '/',

  body('title').exists(),
  body('order').isNumeric(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const boardId = `${req.baseUrl}`.split('/')[2];
      res.status(201).json(
        createTask({
          description: 'Lorem ipsum',
          ...req.body,
          boardId,
        })
      );
    } catch (e) {
      console.log('catch on create task');
      next(e);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    const result: any = deleteById(id as string);
    return res.status(200).json({ message: result });
  } catch (e) {
    console.log('catch on task delete by id');
    next(e);
  }
  return {};
});

router.put('/:id', async (req, res, next) => {
  const { params } = req;
  console.log('on update task; query', req.query);
  console.log('params: ', req.params);
  console.log('body: ', req.body);
  const { id } = params;
  try {
    const result: any = updateTask({
      ...req.body,
      id,
    });
    return res.status(200).json({ message: result });
  } catch (e) {
    console.log('catch on task update by id');
    next(e);
  }
  return {};
});

export default router;
