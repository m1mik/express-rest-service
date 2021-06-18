import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { setCorrectOrder } from '../../src/helpers';
// eslint-disable-next-line import/no-cycle
import Board from './Board';
// eslint-disable-next-line import/no-cycle
import Column from './Column';
// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OrmColumn()
  public title: string;

  @OrmColumn()
  public order: number;

  @OrmColumn()
  public description: string;

  @ManyToOne(() => Board, (board) => board.tasks)
  public board: Board;

  @ManyToOne(() => Column, (column) => column.tasks)
  public column: Column;

  @ManyToOne(() => User, (user) => user.tasks)
  public user: User;

  constructor(task: {
    title: string;
    order: number;
    description: string;
    column: Column;
  }) {
    this.id = uuidv4();
    this.title = task.title;
    this.order = setCorrectOrder(task.order, 'TASK');
    this.description = task.description || '';
    this.board = {} as Board;
    this.column = {} as Column;
    this.user = {} as User;
  }
}
