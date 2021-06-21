import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import MyColumn from './Column';
// eslint-disable-next-line import/no-cycle
import Task from './Task';

@Entity()
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @OneToMany(() => MyColumn, (column) => column.board, { cascade: true })
  public columns: MyColumn[];

  @OneToMany(() => Task, (task) => task.board, { cascade: true })
  public tasks: Task[];
}
