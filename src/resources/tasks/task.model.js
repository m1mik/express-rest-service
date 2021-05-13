const { v4: uuidv4 } = require('uuid');
const { setCorrectOrder } = require('../../helpers');

class Task {
  constructor({
    id = uuidv4(),
    title = 'TASK NAME',
    order = 0,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = setCorrectOrder(order, 'TASK');
    this.description = description;
    this.userId = userId; // assignee
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
