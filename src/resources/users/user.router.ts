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

const router = express.Router({ mergeParams: true });
router.get('/', loggerActor, async (_req: Request, res) => {
  const users = getAll();
  res.json(users.map(User.toResponse));
});

router.get('/:id', loggerActor, async (req, res) => {
  const { id } = req.params;
  const user = getById(id as string);
  if (user) return res.status(200).json(User.toResponse(user));
  return res
    .status(404)
    .json({ message: `There is no user with such (${id}) id.` });
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

router.delete('/:id', loggerActor, async (req, res) => {
  const { params } = req;
  const { id } = params;
  const result: Partial<User> | Error = deleteById(id as string);
  if (result instanceof Error) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

router.put('/:id', loggerActor, async (req, res) => {
  const { params } = req;
  const { id } = params;
  const result: Partial<User> | Error = updateUser({
    ...req.body,
    id,
  });
  if (result instanceof Error) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

export default router;
