import {
  getRepository,
  getConnection,
  InsertResult,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import User from '../../../database/entities/User';

export const getAll = async (): Promise<User[]> => {
  const result = await getRepository(User).createQueryBuilder('user').getMany();
  console.log('ALL users!: ', result);
  return result;
};

export const getById = async (id: string): Promise<User | undefined> =>
  getRepository(User)
    .createQueryBuilder('user')
    .where('user.id = : id', { id })
    .getOne();

export const createUser = async (data: {
  name: string;
  login: string;
  password: string;
}): Promise<InsertResult> =>
  getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(new User(data))
    .execute();

export const deleteById = async (id: string): Promise<DeleteResult> =>
  getRepository(User)
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('id = :id', { id })
    .execute();

export const updateUser = async (
  dataForUpdate: Partial<User>
): Promise<UpdateResult> =>
  getRepository(User)
    .createQueryBuilder()
    .update(User)
    .set(dataForUpdate)
    .where('id = :id', { id: dataForUpdate.id })
    .execute();
