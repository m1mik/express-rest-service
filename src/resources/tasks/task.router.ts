import express, { Request } from 'express';
import { body } from 'express-validator';
import { validate, isError } from '../../helpers';
import { getAll, getById, createTask, deleteById, updateTask } from './task.service';
import { Result } from '../../types';

const router = express.Router();
// eslint-disable-next-line
router.route('/').get(async (req: Request, res) => {
  console.log(req.method);
  const users = getAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const task = getById(id);
  if (task) return res.status(200).json(task);
  return res
    .status(404)
    .json({ message: `There is no task with such (${id}) id.` });
});

router.post(
  '/',
  body('title').exists(),
  body('order').isNumeric(),
  validate,
  (req, res) => {
    const boardId = `${req.baseUrl}`.split('/')[2];
    res
      .status(201)
      .json(
        createTask({
          description: 'Lorem ipsum',
          ...req.body,
          boardId,
        })
      );
  }
);

router.delete('/:id', async (req, res) => {
  const result: Result = deleteById(req.params.id);
  if (isError(result)) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

router.put('/:id', async (req, res) => {
  const result: Result = updateTask({
    ...req.body,
    id: req.params.id,
  });
  if (isError(result)) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

export default router;
