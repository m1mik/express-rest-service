// import { Sequelize } from 'sequelize';
import { PORT } from './common/config';

import app from './app';

// const sequelize = new Sequelize(
//   'postgres://myuser:password@172.19.0.2:5433/hello_db'
// );

app.listen(PORT, async () => {
  console.log(`App is running on http://localhost:${PORT}`);
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }

  // throw new Error('uncaughtException fired!');
  // Promise.reject(new Error('rejecter'));
});
