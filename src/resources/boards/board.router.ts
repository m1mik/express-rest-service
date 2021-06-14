import express, { Request } from 'express';
import { body } from 'express-validator';
import { validate } from '../../helpers';
import Board from './board.model';
import loggerActor from '../../logger';
import { CustomError } from '../../types';

import {
  getAll,
  getById,
  createBoard,
  deleteById,
  updateBoard,
} from './board.service';

const router = express.Router({ mergeParams: true });

router.get('/', loggerActor, async (_req: Request, res) => {
  const boards = getAll();
  res.json(boards);
});

router.get('/test', (_req, _res, next) => {
  try {
    throw new CustomError(666, 'error');
  } catch (e) {
    next(e);
  }
});

router.get('/:id', loggerActor, async (req, res, next) => {
  const { id } = req.params;
  try {
    const board = getById(id || '');
    if (board) return res.status(200).json(board);
    throw new CustomError(404, `There is no board with such (${id}) id.`);
  } catch (e) {
    next(e);
  }
  return {};
  // return res
  //   .status(404)
  //   .json({ message: `There is no board with such (${id}) id.` });
});

router.post(
  '/',
  loggerActor,
  body('id').optional().isUUID(),
  body('title').exists(),
  body('columns').optional().isArray(),
  body('columns.*.title').exists(),
  body('columns.*.order').exists().isNumeric(),
  validate,
  async (req, res) => {
    res.status(201).json(createBoard(req.body));
  }
);

router.delete('/:id', loggerActor, async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    const result: Board = deleteById(id as string);
    return res.status(200).json({ message: result });
  } catch (e) {
    next(e);
  }
  return {};
});

router
  .route('/:id')
  .put(
    loggerActor,
    body('columns').optional().isArray(),
    body('columns.*.title').exists(),
    body('columns.*.order').exists().isNumeric(),
    body('columns.*.id').optional().isUUID(),
    async (req, res, next) => {
      try {
        const result = updateBoard({
          ...req.body,
          id: req.params.id,
        });
        return res.status(200).json({ message: result });
      } catch (e) {
        next(e);
      }
      return {};
    }
  );

export default router;
