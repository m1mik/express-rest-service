import {
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import Task from './Task';

export interface UserProps {
  name: string;
  login: string;
  password: string;
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OrmColumn()
  public name: string;

  @OrmColumn()
  public login: string;

  @OrmColumn()
  public password: string;

  @OneToMany(() => Task, (task) => task.user)
  public tasks: Task[];

  constructor(user: { name: string; login: string; password: string }) {
    this.id = uuidv4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
    this.tasks = [];
  }

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
