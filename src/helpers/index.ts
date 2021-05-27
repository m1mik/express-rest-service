import { matchedData, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { Result } from '../types';

const MAX_COLUMN_ORDER = 5;
const MAX_TASK_ORDER = 5;

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
export const isError = (result: Result): boolean => result instanceof Error;
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
