import DB from '../DB';
import Task from './task.model';
import { CustomError } from '../../types';
import Column from '../columns/column.model';

/**
 * returns all Tasks
 * @returns {Task[]}
 */
export const getAll = (): Task[] => DB.tasks;

/**
 * returns Task by incoming id or undefined
 * @param {string} id - incoming task id
 * @returns {Task} task - founded in DB task
 * @throws {Error} error - returns error if there is no Task with such id
 */
export const getById = (id: string): Task | undefined =>
  DB.tasks.find((tas: Task) => tas.id === id);

/**
 * creates task based on incoming data
 * @param {Partial<Task>} data - essential data for new task instance
 * @returns {Task} task - created task object
 */
export const createTask = (data: {
  title: string;
  order: number;
  description: string;
  column: Column;
}): Task => {
  const newTask = new Task(data);
  DB.tasks.push(newTask);
  return newTask;
};

/**
 * deletes task by id
 * @param {string} id - incoming task id for remove
 * @returns {Task} task - returns deleted object
 * @throws {Error} error - returns error if there is no task with such id
 */
export const deleteById = (id: string): Task => {
  let removedTask = null;
  DB.tasks = DB.tasks.filter((task) => {
    if (task.id === id) {
      removedTask = task;
      return false;
    }

    return true;
  });
  if (removedTask) return removedTask;
  throw new CustomError(404, `There is no task with ${id} id.`);
};

/**
 * updates task based on incoming data
 * @param {Partial<Task>} dataForUpdate - object with new task data
 * @returns {Task} task - final look of updated task instance
 * @throws {Error} error - returns error if there is no task with such id
 */
export const updateTask = (dataForUpdate: Partial<Task>): Task => {
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
  throw new CustomError(404, `There is no task with ${dataForUpdate.id} id.`);
};
