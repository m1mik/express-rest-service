import {
  getRepository,
  getConnection,
  InsertResult,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import Task from '../../database/entities/Task';
import Column from '../../database/entities/Column';

/**
 * returns all Tasks
 * @returns {Task[]}
 */
export const getAll = async (): Promise<Task[]> => {
  const result = await getRepository(Task).createQueryBuilder('task').getMany();
  console.log('ALL tasks!: ', result);
  return result;
};

export const getById = async (id: string): Promise<Task | undefined> =>
  getRepository(Task)
    .createQueryBuilder('task')
    .where('user.id = : id', { id })
    .getOne();

export const createTask = async (data: {
  title: string;
  order: number;
  description: string;
  column: Column;
}): Promise<InsertResult> =>
  getConnection()
    .createQueryBuilder()
    .insert()
    .into(Task)
    .values(new Task(data))
    .execute();

export const deleteById = async (id: string): Promise<DeleteResult> =>
  getRepository(Task)
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where('id = :id', { id })
    .execute();

export const updateTask = async (
  dataForUpdate: Partial<Task>
): Promise<UpdateResult> =>
  getRepository(Task)
    .createQueryBuilder()
    .update(Task)
    .set(dataForUpdate)
    .where('id = :id', { id: dataForUpdate.id })
    .execute();
