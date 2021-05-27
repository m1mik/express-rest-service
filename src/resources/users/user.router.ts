import express, { Request } from 'express';
import { body } from 'express-validator';
import User from './user.model';
import { validate, isError } from '../../helpers';
import {
  getAll,
  getById,
  createUser,
  deleteById,
  updateUser,
} from './user.service';
import { Result } from '../../types';

const router = express.Router();
router.route('/').get(async (req: Request, res) => {
  console.log(req.method);
  const users = getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = getById(id);
  if (user) return res.status(200).json(User.toResponse(user));
  return res
    .status(404)
    .json({ message: `There is no user with such (${id}) id.` });
});

router.post(
  '/',
  body(['name', 'login', 'password']).exists(),
  validate,
  (req, res) => {
    res.status(201).json(createUser(req.body));
  }
);

router.delete('/:id', async (req, res) => {
  const result: Result = deleteById(req.params.id);
  if (isError(result)) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

router.put('/:id', async (req, res) => {
  const result: Result = updateUser({ ...req.body, id: req.params.id });
  if (isError(result)) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

export default router;
