import { ManyToOne, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Board from './Board';
// eslint-disable-next-line import/no-cycle
import MyColumn from './Column';
// eslint-disable-next-line import/no-cycle
import User from './User';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public order: number;

  @Column()
  public description: string;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  public board: Board;

  @ManyToOne(() => MyColumn, (column) => column.tasks, { onDelete: 'CASCADE' })
  public column: MyColumn;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  public user: User;
}
