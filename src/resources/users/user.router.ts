import express, { Request } from 'express';
import { body } from 'express-validator';
import { getRepository } from 'typeorm';
import User from '../../database/entities/User';
import Task from '../../database/entities/Task';
import { validate } from '../../helpers';
import {
  getAll,
  getById,
  createUser,
  deleteById,
  updateUser,
} from './user.service';
import { CustomError } from '../../types';

const router = express.Router({ mergeParams: true });
router.get('/', async (_req: Request, res) => {
  const users = await getAll();
  res.json(users.map(User.toResponse));
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getById(id as string);
    if (user) return res.status(200).json(User.toResponse(user));
    throw new CustomError(404, `There is no user with such (${id}) id.`);
  } catch (e) {
    next(e);
  }
  return {};
});

router.post(
  '/',

  body(['name', 'login', 'password']).exists(),
  validate,
  async (req, res) => {
    const result = await createUser(req.body);
    const tasks = await getRepository(Task)
      .createQueryBuilder('task')
      .getMany();
    console.log('TASKs on delete: ', tasks);
    res.status(201).json(User.toResponse(result));
  }
);

router.delete('/:id', async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    const result: any = await deleteById(id as string);
    return res.status(200).json({ message: result });
  } catch (e) {
    next(e);
  }
  return {};
});

router.put('/:id', async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    const result: any = await updateUser({
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
