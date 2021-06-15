// import { Sequelize } from 'sequelize';
import { createConnection } from 'typeorm';
import { PORT } from './common/config';
// import { sequelize } from './database';

import app from './app';

// const sequelize = new Sequelize(
//   'postgres://myuser:password@172.19.0.2:5433/hello_db'
// );

app.listen(PORT, async () => {
  console.log(`App is running on http://localhost:${PORT}`);
  // sequelize
  //   .sync()
  //   .then(() => console.log('DB sync success'))
  //   .catch((e) => console.log(`DB sync failed.\n${e}`));
  let retries = 20;
  while (retries) {
    try {
      // eslint-disable-next-line
      await createConnection();
      console.log('typeorm connection SUCCESS!!!!');
      break;
    } catch (e) {
      console.log('typeorm connection failed');
      retries -= 1;
      // eslint-disable-next-line
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }

  // throw new Error('uncaughtException fired!');
  // Promise.reject(new Error('rejecter'));
});
