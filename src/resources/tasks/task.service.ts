import DB from '../DB';
import Task from './task.model';

export const getAll = (): Task[] => DB.tasks;

export const getById = (id: string): Task | undefined => DB.tasks.find((tas: Task) => tas.id === id);
export const createTask = (data: { title: string, order: number, description: string }): Task => {
  const newTask = new Task(data);
  DB.tasks.push(newTask);
  return newTask;
};
export const deleteById = (id: string): Task | Error => {
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
export const updateTask = (dataForUpdate: Partial<Task>): Task | Error => {
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

