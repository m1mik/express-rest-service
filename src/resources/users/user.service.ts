import DB from '../DB';
import User from './user.model';

/**
 * returns all Users
 * @returns {User[]}
 */
export const getAll = (): User[] => DB.users;

/**
 * returns User by incoming id or undefined
 * @param {string} id - incoming user id
 * @returns {User} user - founded in DB user
 * @throws {Error} error - returns error if there is no User with such id
 */
export const getById = (id: string): User | undefined =>
  DB.users.find((user: User) => user.id === id);

/**
 * creates user based on incoming data
 * @param {Partial<Board>} data - essential data for new user instance
 * @returns {User} user - created user object
 */
export const createUser = (data: {
  name: string;
  login: string;
  password: string;
}): Partial<User> => {
  const newUser = new User(data);
  DB.users.push(newUser);
  return User.toResponse(newUser);
};

/**
 * deletes user by id
 * @param {string} id - incoming user id for remove
 * @returns {User} user - returns deleted object
 * @throws {Error} error - returns error if there is no user with such id
 */
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

/**
 * updates user based on incoming data
 * @param {Partial<User>} dataForUpdate - object with new user data
 * @returns {User} user - final look of updated user instance
 * @throws {Error} error - returns error if there is no user with such id
 */
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
