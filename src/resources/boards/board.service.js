const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);
const createBoard = (data) => boardsRepo.createBoard(data);
const deleteById = (id) => boardsRepo.deleteById(id);
const updateBoard = (newInfo) => boardsRepo.updateBoard(newInfo);

module.exports = { getAll, getById, createBoard, deleteById, updateBoard };
