const { matchedData, validationResult } = require('express-validator');

const MAX_COLUMN_ORDER = 5;
const MAX_TASK_ORDER = 5;

module.exports = {
  validate: (req, res, next) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    req.query = matchedData(req, { locations: ['query'] });
    req.params = matchedData(req, { locations: ['params'] });
    req.body = matchedData(req, { locations: ['body'] });

    return next();
  },
  isError: (result) => result instanceof Error,
  setCorrectOrder: (value, orderType) => {
    const constType =
      orderType === 'COLUMN' ? MAX_COLUMN_ORDER : MAX_TASK_ORDER;
    let correctOrder = 0;
    if (value > constType) {
      correctOrder = constType;
    } else if (value < 0) {
      correctOrder = 0;
    } else {
      correctOrder = value;
    }
    return correctOrder;
  },
};
