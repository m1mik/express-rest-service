import express, { Request } from 'express';
import { body } from 'express-validator';
import { validate } from '../../helpers';
import { CustomError } from '../../types';

import {
  getAll,
  getById,
  createBoard,
  deleteById,
  updateBoard,
} from './board.service';

const router = express.Router({ mergeParams: true });

router.get('/', async (_req: Request, res) => {
  const boards = await getAll();
  res.json(boards);
});

router.get('/test', (_req, _res, next) => {
  try {
    throw new CustomError(666, 'error');
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log('AIMED BOARD ID params: ', req.params.id, req.body.id);
  try {
    const board = await getById(id || '');
    if (board) return res.status(200).json(board);
    throw new CustomError(404, `There is no board with such (${id}) id.`);
  } catch (e) {
    console.log('catch on board get by id');
    next(e);
  }
  return {};
});

router.post(
  '/',

  body('id').optional().isUUID(),
  body('title').exists(),
  body('columns').optional().isArray(),
  body('columns.*.title').exists(),
  body('columns.*.order').exists().isNumeric(),
  validate,
  async (req, res) => {
    res.status(201).json(await createBoard(req.body));
  }
);

router.delete('/:id', async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  try {
    const result: any = await deleteById(id as string);
    return res.status(200).json({ message: result });
  } catch (e) {
    console.log('catch on board delete by id');
    next(e);
  }
  return {};
});

router
  .route('/:id')
  .put(
    body('columns').optional().isArray(),
    body('columns.*.title').exists(),
    body('columns.*.order').exists().isNumeric(),
    body('columns.*.id').optional().isUUID(),
    async (req, res, next) => {
      console.log('ON BOARD UPD data.');
      console.log('Req body: ', req.body, req.params, req.query);
      try {
        const result = await updateBoard({
          ...req.body,
          id: req.params.id,
        });
        return res.status(200).json({ message: result });
      } catch (e) {
        console.log('catch on board update');
        next(e);
      }
      return {};
    }
  );

export default router;
