import express, { Request } from 'express';
import { body } from 'express-validator';
import User from './user.model';
import { validate } from '../../helpers';
import {
  getAll,
  getById,
  createUser,
  deleteById,
  updateUser,
} from './user.service';
import loggerActor from '../../logger';
import { CustomError } from '../../types';

const router = express.Router({ mergeParams: true });
router.get('/', loggerActor, async (_req: Request, res) => {
  const users = getAll();
  res.json(users.map(User.toResponse));
});

router.get('/:id', loggerActor, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = getById(id as string);
    if (user) return res.status(200).json(User.toResponse(user));
    throw new CustomError(404, `There is no user with such (${id}) id.`);
  } catch (e) {
    next(e);
  }
  return {};
});

router.post(
  '/',
  loggerActor,
  body(['name', 'login', 'password']).exists(),
  validate,
  (req, res) => {
    res.status(201).json(createUser(req.body));
  }
);

router.delete('/:id', loggerActor, async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    const result: Partial<User> = deleteById(id as string);
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
    const result: Partial<User> | Error = updateUser({
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
