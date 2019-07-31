const { app } = require('./express/server');
const { app: appConfig } = require('./src/config');

app.listen(appConfig.port, () =>
  console.log(`App running on port ${appConfig.port}!`));