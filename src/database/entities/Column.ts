import {
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Board from './Board';
// eslint-disable-next-line import/no-cycle
import Task from './Task';

@Entity()
export default class Column {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OrmColumn()
  public title: string;

  @OrmColumn()
  public order: number;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  public tasks: Task[];

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  public board: Board;
}
