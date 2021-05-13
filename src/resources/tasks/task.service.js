global.tasks = [];
const Task = require('./task.model');

const getAll = () => global.tasks;

const getById = (id) => global.tasks.find((tas) => tas.id === id);
const createTask = (data) => {
  const newTask = new Task(data);
  global.tasks.push(newTask);
  return newTask;
};
const deleteById = (id) => {
  let removedTask = null;
  global.tasks = global.tasks.filter((task) => {
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
  global.tasks = global.tasks.map((task) => {
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
