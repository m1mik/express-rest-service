global.boards = [];
// let { tasks } = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAll = () => global.boards;
const getById = (id) => global.boards.find((board) => board.id === id);
const createBoard = (board) => {
  const newBoard = new Board(board);
  global.boards.push(newBoard);
  return newBoard;
};

const deleteById = (id) => {
  let removedBoard = null;
  console.log('tasks before board del: ', global.tasks);
  global.boards = global.boards.filter((board) => {
    if (board.id === id) {
      removedBoard = board;
      global.tasks = global.tasks.filter((tas) => tas.boardId !== id);

      return false;
    }
    return true;
  });
  console.log('tasks after board del: ', global.tasks);
  if (removedBoard) return removedBoard;
  return new Error(`There is no board with ${id} id.`);
};

const updateBoard = (dataForUpdate) => {
  let boardForReturn = null;
  global.boards = global.boards.map((board) => {
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
