import { v4 as uuidv4 } from 'uuid';
import { setCorrectOrder } from '../../helpers';

export default class Task {
  public id: string;

  public title: string;

  public order: number;

  public description: string;

  public userId?: string | null;

  public boardId?: string | null;

  public columnId?: string | null;

  constructor(task: { title: string; order: number; description: string; userId?: string; boardId?: string, columnId?: string }) {
    this.id = uuidv4();
    this.title = task.title;
    this.order = setCorrectOrder(task.order, 'TASK');
    this.description = task.description || '';
    this.userId = task.userId || null;
    this.boardId = task.boardId || null;
    this.columnId = task.columnId || null;
  }
}

