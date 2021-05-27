import DB from '../DB';
import User from './user.model';

export const getAll = (): User[] => DB.users;

export const getById = (id: string): User | undefined =>
  DB.users.find((user: User) => user.id === id);
export const createUser = (data: {
  name: string;
  login: string;
  password: string;
}): Partial<User> => {
  const newUser = new User(data);
  DB.users.push(newUser);
  return User.toResponse(newUser);
};
export const deleteById = (id: string): Partial<User> | Error => {
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
export const updateUser = (
  dataForUpdate: Partial<User>
): Partial<User> | Error => {
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
