import { NextFunction, Request, Response } from 'express';

class Logger {
  private request: Request;

  constructor(req: Request) {
    this.request = req;
  }

  public logUrl = (): void =>
    console.log(`url: ${this.request.baseUrl}${this.request.path}`);

  public logMethod = (): void => console.log(`method: ${this.request.method}`);

  public logParams = (): void => {
    let finalString = '';
    if (Object.keys(this.request.params).length) {
      for (const [param, value] of Object.entries(this.request.params)) {
        finalString += `${param}: ${value}`;
      }
      console.log(`params: ${finalString}`);
    } else {
      console.log(`Request has no params.`);
    }
  };

  public logQueryParams = (): void => {
    let finalString = '';
    if (Object.keys(this.request.query).length) {
      for (const [param, value] of Object.entries(this.request.query)) {
        finalString += `${param}: ${value}`;
      }
      console.log(`query params: ${finalString}`);
    } else {
      console.log(`Request has no query params`);
    }
  };

  public logBody = (): void => console.log(this.request.body);
}

const loggerActor = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const logger: Logger = new Logger(req);
  logger.logUrl();
  logger.logMethod();
  logger.logParams();
  logger.logQueryParams();
  console.log('-----------------------------');
  next();
};

export default loggerActor;
