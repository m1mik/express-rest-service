import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { winstonInstance as logger } from './logger';
import { errorMiddleware } from './helpers';

process.on('uncaughtException', (err: Error, origin: string) => {
  process.stderr.write(
    `uncaughtException error: ${JSON.stringify(err)}; origin: ${JSON.stringify(
      origin
    )}`
  );
  logger.log({
    level: 'emerg',
    message: `uncaughtException: ${JSON.stringify(err)}; origin: ${origin}`,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  process.stderr.write(
    `promise rejection reason: ${JSON.stringify(
      reason
    )}, promise: ${JSON.stringify(promise)}`
  );
  logger.log({
    level: 'error',
    message: `promise rejection reason: ${JSON.stringify(
      reason
    )}, promise: ${JSON.stringify(promise)}`,
  });
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/boards', boardRouter);
app.use(errorMiddleware);

export default app;
