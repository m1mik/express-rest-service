import {
  getRepository,
  getConnection,
  InsertResult,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import Board from '../../database/entities/Board';

export const getAll = async (): Promise<Board[]> => {
  const result = await getRepository(Board)
    .createQueryBuilder('board')
    .getMany();
  console.log('ALL boards: ', result);
  return result;
};

export const getById = async (id: string): Promise<Board | undefined> =>
  getRepository(Board)
    .createQueryBuilder('board')
    .where('user.id = : id', { id })
    .getOne();

export const createBoard = async (data: {
  title: string;
}): Promise<InsertResult> =>
  getConnection()
    .createQueryBuilder()
    .insert()
    .into(Board)
    .values(new Board({ title: data.title }))
    .execute();

export const deleteById = async (id: string): Promise<DeleteResult> =>
  getRepository(Board)
    .createQueryBuilder()
    .delete()
    .from(Board)
    .where('id = :id', { id })
    .execute();

export const updateBoard = async (
  dataForUpdate: Partial<Board>
): Promise<UpdateResult> =>
  getRepository(Board)
    .createQueryBuilder()
    .update(Board)
    .set(dataForUpdate)
    .where('id = :id', { id: dataForUpdate.id })
    .execute();
