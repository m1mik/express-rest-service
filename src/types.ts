import Board from './resources/boards/board.model';
import Column from './resources/columns/column.model';
import Task from './resources/tasks/task.model';
import User from './resources/users/user.model';

export class CustomError extends Error {
  public code: number;

  public message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
export type Result = Board | Column | Task | Partial<User> | Error;
