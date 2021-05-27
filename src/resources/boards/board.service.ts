import DB from '../DB';
import Board from './board.model';
import Column from '../columns/column.model';

export const getAll = (): Board[] => DB.boards;

export const getById = (id: string): Board | undefined =>
  DB.boards.find((board: Board) => board.id === id);
export const createBoard = (data: {
  title: string;
  columns: Column[];
}): Board => {
  const newBoard = new Board(data);
  DB.boards.push(newBoard);
  return newBoard;
};
export const deleteById = (id: string): Board | Error => {
  let removedBoard;
  DB.boards = DB.boards.filter((board) => {
    if (board.id === id) {
      removedBoard = board;
      DB.tasks = DB.tasks.filter((tas) => tas.boardId !== id);

      return false;
    }
    return true;
  });
  if (removedBoard) return removedBoard;
  return new Error(`There is no board with ${id} id.`);
};
export const updateBoard = (dataForUpdate: Partial<Board>): Board | Error => {
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
  return new Error(`There is no board with ${dataForUpdate.id} id.`);
};
