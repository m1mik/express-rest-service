import {
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Column from './Column';
// eslint-disable-next-line import/no-cycle
import Task from './Task';

@Entity()
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OrmColumn()
  public title: string;

  @OneToMany(() => Column, (column) => column.board, { cascade: true })
  public columns: Column[];

  @OneToMany(() => Task, (task) => task.board, { cascade: true })
  public tasks: Task[];
}
