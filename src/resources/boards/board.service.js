const DB = require('../DB');
const Board = require('./board.model');

const getAll = () => DB.boards;

const getById = (id) => DB.boards.find((board) => board.id === id);
const createBoard = (data) => {
  const newBoard = new Board(data);
  DB.boards.push(newBoard);
  return newBoard;
};
const deleteById = (id) => {
  let removedBoard = null;
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
const updateBoard = (dataForUpdate) => {
  let boardForReturn = null;
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

module.exports = { getAll, getById, createBoard, deleteById, updateBoard };
