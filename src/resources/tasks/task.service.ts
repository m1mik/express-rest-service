import {
  getRepository,
  getConnection,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import Task from '../../database/entities/Task';
import Column from '../../database/entities/Column';
import User from '../../database/entities/User';
import Board from '../../database/entities/Board';

export const getAll = async (): Promise<Task[]> => {
  const result = await getRepository(Task).createQueryBuilder('task').getMany();
  return result;
};

export const getById = async (id: string): Promise<Task | undefined> => {
  const { manager } = getConnection();
  const task = await manager.getId(Task, { id });
  return task;
};

export const createTask = async (data: {
  title: string;
  order: number;
  description: string;
  column: Column;
  userId: string;
  boardId: string;
  columnId: string;
}): Promise<Task> => {
  const user = await getRepository(User).findOne({
    where: {
      id: data.userId,
    },
  });
  const board = await getRepository(Board).findOne({
    where: {
      id: data.boardId,
    },
  });
  const column = await getRepository(Column).findOne({
    where: {
      id: data.columnId,
    },
  });
  const { manager } = getConnection();
  const task = manager.create(Task, { ...data, user, board, column });
  const result = await manager.save(task);
  return result;
};

export const deleteById = async (id: string): Promise<DeleteResult> => {
  const { manager } = getConnection();
  const task = await manager.delete(Task, id);
  return task.raw;
};

export const updateTask = async (
  dataForUpdate: Partial<Task>
): Promise<UpdateResult> => {
  const result = await getRepository(User)
    .createQueryBuilder('myusers')
    .getMany();
  console.log('in update, : ', result, dataForUpdate);
  const { manager } = getConnection();
  const task = await manager.update(Task, dataForUpdate.id, dataForUpdate);
  return task.raw;
};
