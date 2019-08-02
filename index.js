const { app } = require('./express/server');
const { app: appConfig } = require('./src/config');

// eslint-disable-next-line
app.listen(appConfig.port, () => console.warn(`App running on port ${appConfig.port}!`));