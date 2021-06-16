import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { setCorrectOrder } from '../../helpers';
// eslint-disable-next-line import/no-cycle
import Board from '../boards/board.model';
// eslint-disable-next-line import/no-cycle
import Column from '../columns/column.model';
// eslint-disable-next-line import/no-cycle
import User from '../users/user.model';

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

  // public userId?: string | null;

  // public boardId?: string | null;

  // public columnId?: string | null;

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
    // userId?: string;
    // boardId?: string;
    // columnId?: string;
    column: Column;
  }) {
    this.id = uuidv4();
    this.title = task.title;
    this.order = setCorrectOrder(task.order, 'TASK');
    this.description = task.description || '';
    // this.userId = task.userId || null;
    // this.boardId = task.boardId || null;
    // this.columnId = task.columnId || null;
    this.board = {} as Board;
    this.column = {} as Column;
    this.user = {} as User;
  }
}
