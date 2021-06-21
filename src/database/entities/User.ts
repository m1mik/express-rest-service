import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Task from './Task';

export interface UserProps {
  name: string;
  login: string;
  password: string;
}

@Entity({ name: 'myusers' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public login: string;

  @Column()
  public password: string;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  public tasks: Task[];

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
