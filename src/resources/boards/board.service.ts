import {
  getRepository,
  getConnection,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import Board from '../../database/entities/Board';

export const getAll = async (): Promise<Board[]> => {
  const result = await getRepository(Board)
    .createQueryBuilder('board')
    .getMany();
  return result;
};

export const getById = async (id: string): Promise<Board | undefined> => {
  const board = await getRepository(Board).findOne({
    where: {
      id,
    },
  });

  return board;
};

export const createBoard = async (data: { title: string }): Promise<Board> => {
  const { manager } = getConnection();
  const board = manager.create(Board, data);
  const result = await manager.save(board);
  return result;
};

export const deleteById = async (id: string): Promise<DeleteResult> => {
  const { manager } = getConnection();
  const board = await manager.delete(Board, id);
  return board.raw;
};

export const updateBoard = async (
  dataForUpdate: Partial<Board>
): Promise<UpdateResult> => {
  const { manager } = getConnection();
  const initBoard = await getRepository(Board).findOne({
    where: { id: dataForUpdate.id },
    relations: ['columns', 'tasks'],
  });
  console.log('init board: ', initBoard);
  const board = await manager.update(Board, dataForUpdate.id, dataForUpdate);
  console.log('udpated board: ', board);
  return board.raw;
};
