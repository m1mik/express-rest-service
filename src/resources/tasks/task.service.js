const DB = require('../DB');
const Task = require('./task.model');

const getAll = () => DB.tasks;

const getById = (id) => DB.tasks.find((tas) => tas.id === id);
const createTask = (data) => {
  const newTask = new Task(data);
  DB.tasks.push(newTask);
  return newTask;
};
const deleteById = (id) => {
  let removedTask = null;
  DB.tasks = DB.tasks.filter((task) => {
    if (task.id === id) {
      removedTask = task;
      return false;
    }

    return true;
  });
  if (removedTask) return removedTask;
  return new Error(`There is no task with ${id} id.`);
};
const updateTask = (dataForUpdate) => {
  let taskForReturn = null;
  DB.tasks = DB.tasks.map((task) => {
    if (task.id === dataForUpdate.id) {
      const updatedTask = {
        ...task,
        ...dataForUpdate,
      };
      taskForReturn = updatedTask;
      return updatedTask;
    }
    return task;
  });
  if (taskForReturn) return taskForReturn;
  return new Error(`There is no task with ${dataForUpdate.id} id.`);
};

module.exports = {
  getAll,
  getById,
  createTask,
  deleteById,
  updateTask,
};
