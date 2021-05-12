const { v4: uuidv4 } = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({ id = uuidv4(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((col) => new Column({ ...col }));
  }
}

module.exports = Board;
