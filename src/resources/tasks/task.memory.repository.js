let tasks = [];
const Task = require('./task.model');

const getAll = () => tasks;
const getById = (id) => tasks.find((tas) => tas.id === id);
const createTask = (task) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
};
const deleteById = (id) => {
  let removedTask = null;
  tasks = tasks.filter((task) => {
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
  tasks = tasks.map((task) => {
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
module.exports = { getAll, getById, createTask, deleteById, updateTask };
