const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();

const getById = (id) => taskRepo.getById(id);
const createTask = (data) => taskRepo.createTask(data);
const deleteById = (id) => taskRepo.deleteById(id);
const updateTask = (newInfo) => taskRepo.updateTask(newInfo);

module.exports = {
  getAll,
  getById,
  createTask,
  deleteById,
  updateTask,
};
