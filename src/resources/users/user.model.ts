import { v4 as uuidv4 } from 'uuid';

export interface UserProps {
  name: string;
  login: string;
  password: string;
}
export default class User {
  public id: string;

  public name: string;

  public login: string;

  public password: string;

  // {
  //   id = uuidv4(),
  //   name = 'USER',
  //   login = 'user',
  //   password = 'P@55w0rd',
  // } = {}
  constructor(user: { name: string; login: string; password: string }) {
    this.id = uuidv4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
