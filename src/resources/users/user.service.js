const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);
const createUser = (data) => usersRepo.createUser(data);
const deleteById = (id) => usersRepo.deleteById(id);
const updateUser = (newInfo) => usersRepo.updateUser(newInfo);

module.exports = { getAll, getById, createUser, deleteById, updateUser };
