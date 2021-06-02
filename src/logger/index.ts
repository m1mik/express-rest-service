import { NextFunction, Request, Response } from 'express';
import * as winLog from 'winston';

type Winston = {
  log: (description: { level: string; message: string }) => void;
};
class Logger {
  private request: Request;

  private winston: Winston;

  constructor(req: Request, winstonInstance: Winston) {
    this.request = req;
    this.winston = winstonInstance;
  }

  public logUrl = (): void =>
    this.winston.log({
      level: 'info',
      message: `url: ${this.request.baseUrl}${this.request.path}.`,
    });

  public logMethod = (): void =>
    this.winston.log({
      level: 'info',
      message: `method: ${this.request.method}.`,
    });

  public logParams = (): void => {
    let finalString = '';
    if (Object.keys(this.request.params).length) {
      for (const [param, value] of Object.entries(this.request.params)) {
        finalString += `${param}: ${value}`;
      }
      this.winston.log({
        message: `params: ${finalString}.`,
        level: 'info',
      });
    } else {
      this.winston.log({
        message: `Request has no params.`,
        level: 'info',
      });
    }
  };

  public logQueryParams = (): void => {
    let finalString = '';
    if (Object.keys(this.request.query).length) {
      for (const [param, value] of Object.entries(this.request.query)) {
        finalString += `${param}: ${value}`;
      }
      this.winston.log({
        message: `query params: ${finalString}.`,
        level: 'info',
      });
    } else {
      this.winston.log({
        message: `Request has no query params.`,
        level: 'info',
      });
    }
  };

  public logBody = (): void =>
    this.winston.log({
      message: `${this.request.body}.`,
      level: 'info',
    });

  public separate = (): void =>
    this.winston.log({ level: 'info', message: '-------------------------' });

  public showDate = (): void =>
    this.winston.log({ level: 'info', message: `${new Date().toISOString()}` });
}

export const winstonInstance: Winston = winLog.createLogger({
  level: 'info',
  format: winLog.format.simple(),
  transports: [
    new winLog.transports.File({ filename: 'errors.log', level: 'error' }),
    new winLog.transports.File({
      filename: 'exceptions.log',
      level: 'emerg',
    }),
    new winLog.transports.File({ filename: 'main.log', level: 'info' }),
    new winLog.transports.Console(),
  ],
});

const loggerActor = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const logger: Logger = new Logger(req, winstonInstance);
  logger.showDate();
  logger.logUrl();
  logger.logMethod();
  logger.logParams();
  logger.logQueryParams();
  logger.separate();
  next();
};

export default loggerActor;
