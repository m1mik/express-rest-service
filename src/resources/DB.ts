import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';

const DB: {
  users: User[],
  boards: Board[],
  tasks: Task[],
} = {
  users: [],
  boards: [],
  tasks: [],
}

export default DB;
