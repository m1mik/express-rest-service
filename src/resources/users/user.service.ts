import { getRepository, getConnection, DeleteResult } from 'typeorm';
import User from '../../database/entities/User';
// import Task from '../../database/entities/Task';

export const getAll = async (): Promise<Partial<User>[]> => {
  const result = (
    await getRepository(User).createQueryBuilder('myusers').getMany()
  ).map((user: User) => User.toResponse(user));
  return result;
};

export const getById = async (id: string): Promise<User | undefined> => {
  // const result = await getRepository(User).findOne({
  //   where: {
  //     id,
  //   },
  // });
  const { manager } = getConnection();
  const user = await manager.preload(User, { id });
  return user;
};

export const createUser = async (data: {
  name: string;
  login: string;
  password: string;
}): Promise<User> => {
  const { manager } = getConnection();
  const user = manager.create(User, data);
  const result = await manager.save(user);
  return result;
};

export const deleteById = async (id: string): Promise<DeleteResult> => {
  const { manager } = getConnection();
  const user = await manager.delete(User, id);
  // const prom = await new Promise((res) => {
  //   setTimeout(() => {
  //     res(getRepository(Task).find());
  //   }, 2000);
  // });
  return user.raw;
};

export const updateUser = async (
  dataForUpdate: Partial<User>
): Promise<Partial<User>> => {
  const { manager } = getConnection();
  const user = await manager.update(User, dataForUpdate.id, dataForUpdate);
  return User.toResponse(user.raw);
};
