import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Board from './Board';
// eslint-disable-next-line import/no-cycle
import Task from './Task';

@Entity({ name: 'mycolumn' })
export default class MyColumn {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public order: number;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  public tasks: Task[];

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  public board: Board;
}
