import { v4 as uuidv4 } from 'uuid';
import Column from '../columns/column.model';

export default class Board {
  public id: string;

  public title: string;

  public columns: Column[];

  constructor(board: { title: string; columns: Column[] }) {
    this.id = uuidv4();
    this.title = board.title;
    this.columns = board.columns.map((col) => new Column({ ...col }));
  }
}
