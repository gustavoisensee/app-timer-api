const { app } = require('./express/server');
const { app: appConfig } = require('./src/config');

app.listen(appConfig.port, () =>
  console.warn(`App running on port ${appConfig.port}!`));