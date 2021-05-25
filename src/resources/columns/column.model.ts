import { v4 as uuidv4 } from 'uuid';
import { setCorrectOrder } from '../../helpers';
import Task from '../tasks/task.model';

export default class Column {
  public id: string;

  public title: string;

  public order: number;

  public tasks: Task[];

  // this.id = id;
  //   this.title = title;
  //   this.order = setCorrectOrder(order, 'COLUMN');
  //   this.tasks = tasks.map((tas) => new Task({ ...tas }));
  constructor(column: { title: string; order: number, tasks: Task[] }) {
    this.id = uuidv4();
    this.title = column.title;
    this.order = setCorrectOrder(column.order, 'COLUMN');
    this.tasks = column.tasks;
  }
}


