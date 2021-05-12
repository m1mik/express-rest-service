let boards = [];
const Board = require('./board.model');

const getAll = () => boards;
const getById = (id) => boards.find((board) => board.id === id);
const createBoard = (board) => {
  const newBoard = new Board(board);
  boards.push(newBoard);
  return newBoard;
};

const deleteById = (id) => {
  let removedBoard = null;
  boards = boards.filter((board) => {
    if (board.id === id) {
      removedBoard = board;
      return false;
    }
    return true;
  });

  if (removedBoard) return removedBoard;
  return new Error(`There is no board with ${id} id.`);
};

const updateBoard = (dataForUpdate) => {
  let boardForReturn = null;
  boards = boards.map((board) => {
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
module.exports = {
  getAll,
  getById,
  createBoard,
  deleteById,
  updateBoard,
};
