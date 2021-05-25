const router = require('express').Router();
const { body } = require('express-validator');
const User = require('./user.model');
const { validate, isError } = require('../../helpers');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);
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
    res.status(201).json(usersService.createUser(req.body));
  }
);

router.delete('/:id', async (req, res) => {
  const result = usersService.deleteById(req.params.id);
  if (isError(result)) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

router.put('/:id', async (req, res) => {
  const result = usersService.updateUser({ ...req.body, id: req.params.id });
  if (isError(result)) return res.status(404).json(result);
  return res.status(200).json({ message: result });
});

module.exports = router;
