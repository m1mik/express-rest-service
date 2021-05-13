const DB = require('../DB');
const User = require('./user.model');

const getAll = () => DB.users;

const getById = (id) => DB.users.find((user) => user.id === id);
const createUser = (data) => {
  const newUser = new User(data);
  DB.users.push(newUser);
  return User.toResponse(newUser);
};
const deleteById = (id) => {
  let removedUser = null;
  DB.users = DB.users.filter((user) => {
    if (user.id === id) {
      removedUser = user;
      DB.tasks = DB.tasks.map((tas) => {
        if (tas.userId === id) {
          return { ...tas, userId: null };
        }
        return tas;
      });
      return false;
    }

    return true;
  });
  if (removedUser) return User.toResponse(removedUser);
  return new Error(`There is no user with ${id} id.`);
};
const updateUser = (dataForUpdate) => {
  let userForReturn = null;
  DB.users = DB.users.map((user) => {
    if (user.id === dataForUpdate.id) {
      const updatedUser = {
        ...user,
        ...dataForUpdate,
      };
      userForReturn = updatedUser;
      return updatedUser;
    }
    return user;
  });
  if (userForReturn) return User.toResponse(userForReturn);
  return new Error(`There is no user with ${dataForUpdate.id} id.`);
};

module.exports = { getAll, getById, createUser, deleteById, updateUser };
