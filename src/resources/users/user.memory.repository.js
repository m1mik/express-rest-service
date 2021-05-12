let users = [];
const User = require('./user.model');

const getAll = () => users;
const getById = (id) => users.find((user) => user.id === id);
const createUser = (user) => {
  users.push(new User(user));
  return User.toResponse(user);
};
const deleteById = (id) => {
  let removedUser = null;
  users = users.filter((user) => {
    if (user.id === id) {
      removedUser = user;
      return false;
    }

    return true;
  });
  if (removedUser) return User.toResponse(removedUser);
  return new Error(`There is no user with ${id} id.`);
};
const updateUser = (dataForUpdate) => {
  let userForReturn = null;
  users = users.map((user) => {
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
