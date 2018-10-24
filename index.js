require('dotenv').config();
const app = require('./src/app.js');
const { app: appConfig } = require('./src/config');

app.listen(appConfig.port, err => {
  if (err) {
    console.log(`Error: something went wrong: ${err}`);
    throw err;
  } else {
    console.log(`Server running on port: ${appConfig.port}`);
  }
});