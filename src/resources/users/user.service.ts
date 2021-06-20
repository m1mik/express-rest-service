import { getRepository, getConnection, DeleteResult } from 'typeorm';
import User from '../../database/entities/User';

export const getAll = async (): Promise<Partial<User>[]> => {
  const result = (
    await getRepository(User).createQueryBuilder('user').getMany()
  ).map((user: User) => User.toResponse(user));
  return result;
};

export const getById = async (id: string): Promise<User | undefined> => {
  const result = await getRepository(User).createQueryBuilder('user').getMany();
  console.log('is users setted: ', result.length, result[0]);
  const { manager } = getConnection();
  const user = await manager.preload(User, { id });
  return user;
};

export const createUser = async (data: {
  name: string;
  login: string;
  password: string;
}): Promise<User> => {
  console.log('Create user: ', data);
  const { manager } = getConnection();
  const user = manager.create(User, data);
  const result = await manager.save(user);
  console.log('created user: ', User.toResponse(result));
  return result;
};

export const deleteById = async (id: string): Promise<DeleteResult> => {
  const { manager } = getConnection();
  const user = await manager.delete(User, id);
  return user.raw;
};

export const updateUser = async (
  dataForUpdate: Partial<User>
): Promise<Partial<User>> => {
  const { manager } = getConnection();
  const user = await manager.update(User, dataForUpdate.id, dataForUpdate);
  return User.toResponse(user.raw);
};
