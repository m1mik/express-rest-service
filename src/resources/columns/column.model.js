const { v4: uuidv4 } = require('uuid');
const { setCorrectOrder } = require('../../helpers');
const Task = require('../tasks/task.model');

class Column {
  constructor({ id = uuidv4(), title = 'TITLE', order = 0, tasks = [] } = {}) {
    this.id = id;
    this.title = title;
    this.order = setCorrectOrder(order, 'COLUMN');
    this.tasks = tasks.map((tas) => new Task({ ...tas }));
  }
}

module.exports = Column;
