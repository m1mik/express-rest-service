import { matchedData, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const MAX_COLUMN_ORDER = 5;
const MAX_TASK_ORDER = 5;

/**
 * request middleware
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {NextFunction} next - callback
 * @returns passing to next middleware-function or response with error
 */
export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors });
  }

  req.query = matchedData(req, { locations: ['query'] });
  req.params = matchedData(req, { locations: ['params'] });
  req.body = matchedData(req, { locations: ['body'] });

  return next();
};

/**
 * set valid order value for Column or Task
 * @param {number} value - incoming value
 * @param {string} orderType - incoming model type COLUMN | TASK
 * @returns {number} - value for order
 */
export const setCorrectOrder = (value: number, orderType: string): number => {
  const constType = orderType === 'COLUMN' ? MAX_COLUMN_ORDER : MAX_TASK_ORDER;
  let correctOrder = 0;
  if (value > constType) {
    correctOrder = constType;
  } else if (value < 0) {
    correctOrder = 0;
  } else {
    correctOrder = value;
  }
  return correctOrder;
};

export const errorMiddleware = (
  err: { code: number; message: string },
  _req: Request,
  res: Response,
  // eslint-disable-next-line
  _next: NextFunction
  // eslint-disable-next-line
): Response<any, Record<string, any>> => {
  const { code, message } = err;
  return res.status(code).json({
    status: 'custom error middleware',
    message,
  });
};
