import DB from '../DB';
import Board from './board.model';
import Column from '../columns/column.model';
import { CustomError } from '../../types';

/**
 * returns all Boards
 * @returns {Board[]}
 */
export const getAll = (): Board[] => DB.boards;

/**
 * returns Board by incoming id or undefined
 * @param {string} id - incoming board id
 * @returns {Board} board - founded in DB board
 * @throws {Error} error - returns error if there is no Board with such id
 */
export const getById = (id: string): Board | undefined =>
  DB.boards.find((board: Board) => board.id === id);

/**
 * creates board based on incoming data
 * @param {Partial<Board>} data - essential data for new board instance
 * @returns {Board} board - created board object
 */
export const createBoard = (data: {
  title: string;
  columns: Column[];
}): Board => {
  const newBoard = new Board(data);
  DB.boards.push(newBoard);
  return newBoard;
};

/**
 * deletes board by id
 * @param {string} id - incoming board id for remove
 * @returns {Board} board - returns deleted object
 * @throws {Error} error - returns error if there is no board with such id
 */
export const deleteById = (id: string): Board => {
  let removedBoard;
  DB.boards = DB.boards.filter((board) => {
    if (board.id === id) {
      removedBoard = board;
      DB.tasks = DB.tasks.filter((tas) => tas.board.id !== id);

      return false;
    }
    return true;
  });
  if (removedBoard) return removedBoard;
  throw new CustomError(404, `There is no board with ${id} id.`);
};

/**
 * updates board based on incoming data
 * @param {Partial<Board>} dataForUpdate - object with new board data
 * @returns {Board} board - final look of updated board instance
 * @throws {Error} error - returns error if there is no board with such id
 */
export const updateBoard = (dataForUpdate: Partial<Board>): Board => {
  let boardForReturn;
  DB.boards = DB.boards.map((board) => {
    if (board.id === dataForUpdate.id) {
      const updatedBoard = {
        ...board,
        ...dataForUpdate,
      };
      boardForReturn = updatedBoard;
      return updatedBoard;
    }
    return board;
  });

  if (boardForReturn) return boardForReturn;
  throw new CustomError(404, `There is no board with ${dataForUpdate.id} id.`);
};
