import Board from './database/entities/Board';
import Column from './database/entities/Column';
import Task from './database/entities/Task';
import User from './database/entities/User';

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
