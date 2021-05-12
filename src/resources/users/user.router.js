const router = require('express').Router();
const { body } = require('express-validator');
const User = require('./user.model');
const { validate, isError } = require('./user.helpers');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  res.json(User.toResponse(usersService.getById(id)));
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
  if (isError(result)) res.status(400).json(result);
  res.status(200).json(result);
});

router.put('/:id', async (req, res) => {
  const result = usersService.updateUser({ ...req.body, id: req.params.id });
  if (isError(result)) res.status(400).json(result);
  res.status(200).json(result);
});

module.exports = router;
