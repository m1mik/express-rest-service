import { PORT } from './common/config';

import app from './app';

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
  // throw new Error('uncaughtException fired!');
  // Promise.reject(new Error('rejecter'));
});
