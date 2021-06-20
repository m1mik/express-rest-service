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
  const { manager } = getConnection();
  const board = await manager.preload(Board, { id });
  return board;
};

export const createBoard = async (data: { title: string }): Promise<void> => {
  const { manager } = getConnection();
  const board = manager.create(Board, data);
  await manager.save(board);
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
  const board = await manager.update(Board, dataForUpdate.id, dataForUpdate);
  return board.raw;
};
