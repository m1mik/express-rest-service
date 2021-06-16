import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Column from '../columns/column.model';
// eslint-disable-next-line import/no-cycle
import Task from '../tasks/task.model';

@Entity()
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OrmColumn()
  public title: string;

  @OneToMany(() => Column, (column) => column.board)
  public columns: Column[];

  @OneToMany(() => Task, (task) => task.board)
  public tasks: Task[];

  constructor(board: { title: string }) {
    this.id = uuidv4();
    this.title = board.title;
    this.columns = [];
    this.tasks = [];
  }
}
