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

const router = express.Router({ mergeParams: true });
router.get('/', loggerActor, async (_req: Request, res) => {
  const users = getAll();
  res.json(users);
});

router.get('/:id', loggerActor, async (req, res) => {
  const { id } = req.params;
  const task = getById(id as string);
  if (task) return res.status(200).json(task);
  return res
    .status(404)
    .json({ message: `There is no task with such (${id}) id.` });
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

router.delete('/:id', loggerActor, async (req, res) => {
  const { params } = req;
  const { id } = params;
  const result: Task | Error = deleteById(id as string);
  if (result instanceof Error) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

router.put('/:id', loggerActor, async (req, res) => {
  const { params } = req;
  const { id } = params;
  const result: Task | Error = updateTask({
    ...req.body,
    id,
  });
  if (result instanceof Error) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

export default router;
