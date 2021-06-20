import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
} from 'typeorm';
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

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  public board: Board;

  @ManyToOne(() => Column, (column) => column.tasks, { onDelete: 'CASCADE' })
  public column: Column;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  public user: User;
}
