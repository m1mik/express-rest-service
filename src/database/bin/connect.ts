import { sequelize } from '../index';

sequelize
  .sync()
  .then(() => console.log('DB sync success'))
  .catch((e) => console.log(`DB sync failed.\n${e}`));
