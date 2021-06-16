import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { setCorrectOrder } from '../../helpers';
// eslint-disable-next-line import/no-cycle
import Board from '../boards/board.model';
import Task from '../tasks/task.model';

@Entity()
export default class Column {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OrmColumn()
  public title: string;

  @OrmColumn()
  public order: number;

  @OneToMany(() => Task, (task) => task.column)
  public tasks: Task[];

  @ManyToOne(() => Board, (board) => board.columns)
  public board: Board;

  constructor(column: {
    title: string;
    order: number;
    tasks: Task[];
    board: Board;
  }) {
    this.id = uuidv4();
    this.title = column.title;
    this.order = setCorrectOrder(column.order, 'COLUMN');
    this.tasks = column.tasks;
    this.board = column.board || {};
  }
}
