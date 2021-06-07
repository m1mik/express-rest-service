import Board from './resources/boards/board.model';
import Column from './resources/columns/column.model';
import Task from './resources/tasks/task.model';
import User from './resources/users/user.model';

export type Result = Board | Column | Task | Partial<User> | Error;
