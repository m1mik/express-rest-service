import express, { Request } from 'express';
import { body } from 'express-validator';
import { validate } from '../../helpers';
import Board from './board.model';
import loggerActor from '../../logger';

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

router.get('/:id', loggerActor, async (req, res) => {
  const { id } = req.params;
  const board = getById(id || '');
  if (board) return res.status(200).json(board);
  return res
    .status(404)
    .json({ message: `There is no board with such (${id}) id.` });
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

router.delete('/:id', loggerActor, async (req, res) => {
  const { params } = req;
  const { id } = params;
  const result: Board | Error = deleteById(id as string);
  if (result instanceof Error) {
    return res.status(404).json(result);
  }
  return res.status(200).json({ message: result });
});

router
  .route('/:id')
  .put(
    loggerActor,
    body('columns').optional().isArray(),
    body('columns.*.title').exists(),
    body('columns.*.order').exists().isNumeric(),
    body('columns.*.id').optional().isUUID(),
    async (req, res) => {
      const result = updateBoard({
        ...req.body,
        id: req.params.id,
      });
      if (result instanceof Error) return res.status(404).json(result);
      return res.status(200).json({ message: result });
    }
  );

export default router;
