import Board from './resources/boards/board.model'
import Column from './resources/columns/column.model';
import Task from './resources/columns/column.model';
import User from './resources/columns/column.model';

export type Result = Board | Column | Task | Partial<User> | Error;