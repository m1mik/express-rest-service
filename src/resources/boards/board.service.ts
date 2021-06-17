// import DB from '../DB';
import {
  getRepository,
  getConnection,
  InsertResult,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import Board from './board.model';
// import Column from '../columns/column.model';
// import { CustomError } from '../../types';

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
  // let removedBoard;
  // DB.boards = DB.boards.filter((board) => {
  //   if (board.id === id) {
  //     removedBoard = board;
  //     DB.tasks = DB.tasks.filter((tas) => tas.board.id !== id);

  //     return false;
  //   }
  //   return true;
  // });
  getRepository(Board)
    .createQueryBuilder()
    .delete()
    .from(Board)
    .where('id = :id', { id })
    .execute();
// if (removedBoard) return removedBoard;
// throw new CustomError(404, `There is no board with ${id} id.`);
export const updateBoard = async (
  dataForUpdate: Partial<Board>
): Promise<UpdateResult> =>
  // let boardForReturn;
  // DB.boards = DB.boards.map((board) => {
  //   if (board.id === dataForUpdate.id) {
  //     const updatedBoard = {
  //       ...board,
  //       ...dataForUpdate,
  //     };
  //     boardForReturn = updatedBoard;
  //     return updatedBoard;
  //   }
  //   return board;
  // });

  // if (boardForReturn) return boardForReturn;
  // throw new CustomError(404, `There is no board with ${dataForUpdate.id} id.`);
  getRepository(Board)
    .createQueryBuilder()
    .update(Board)
    .set(dataForUpdate)
    .where('id = :id', { id: dataForUpdate.id })
    .execute();
