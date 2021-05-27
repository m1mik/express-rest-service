import User from './users/user.model';
import Board from './boards/board.model';
import Task from './tasks/task.model';

const DB: {
  users: User[];
  boards: Board[];
  tasks: Task[];
} = {
  users: [],
  boards: [],
  tasks: [],
};

export default DB;
