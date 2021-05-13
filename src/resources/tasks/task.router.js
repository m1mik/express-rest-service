const router = require('express').Router();
const { body } = require('express-validator');
const { validate, isError } = require('../../helpers');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const users = taskService.getAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const task = taskService.getById(id);
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
        taskService.createTask({
          description: 'Lorem ipsum',
          ...req.body,
          boardId,
        })
      );
  }
);

router.delete('/:id', async (req, res) => {
  const result = taskService.deleteById(req.params.id);
  if (isError(result)) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

router.put('/:id', async (req, res) => {
  const result = taskService.updateTask({
    ...req.body,
    id: req.params.id,
  });
  if (isError(result)) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

module.exports = router;
