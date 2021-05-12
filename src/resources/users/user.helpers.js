const { matchedData, validationResult } = require('express-validator');

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
};
