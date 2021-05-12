let users = [];
const User = require('./user.model');

const getAll = () => users;
const getById = (id) => users.find((user) => user.id === id);
const createUser = (user) => {
  const newUser = new User(user);
  users.push(newUser);
  return User.toResponse(newUser);
};
const deleteById = (id) => {
  let removedUser = null;
  console.log('global tasks before user del: ', global.tasks);
  users = users.filter((user) => {
    if (user.id === id) {
      removedUser = user;
      global.tasks = global.tasks.map((tas) => {
        if (tas.userId === id) {
          return { ...tas, userId: null };
        }
        return tas;
      });
      return false;
    }
    console.log('global tasks after user del: ', global.tasks);

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
