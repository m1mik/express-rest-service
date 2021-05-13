const router = require('express').Router();
const { body } = require('express-validator');
const { validate, isError } = require('../../helpers');
const boardsService = require('./board.service');

router.get('/', async (req, res) => {
  const boards = boardsService.getAll();
  res.json(boards);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const board = boardsService.getById(id);
  if (board) return res.status(200).json(board);
  return res
    .status(404)
    .json({ message: `There is no board with such (${id}) id.` });
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
    res.status(201).json(boardsService.createBoard(req.body));
  }
);

router.delete('/:id', async (req, res) => {
  const result = boardsService.deleteById(req.params.id);
  if (isError(result)) {
    return res.status(404).json(result);
  }
  return res.status(200).json({ message: result });
});

router
  .route('/:id')
  .put(
    body('columns').optional().isArray(),
    body('columns.*.title').exists(),
    body('columns.*.order').exists().isNumeric(),
    body('columns.*.id').optional().isUUID(),
    async (req, res) => {
      const result = boardsService.updateBoard({
        ...req.body,
        id: req.params.id,
      });
      if (isError(result)) return res.status(404).json(result);
      return res.status(200).json({ message: result });
    }
  );

module.exports = router;
