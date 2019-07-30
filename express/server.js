require('dotenv').config();

const serverless = require('serverless-http');
const app = require('./../src/app.js');

// app.listen(appConfig.port, err => {
//   if (err) {
//     console.log(`Error: something went wrong: ${err}`);
//     throw err;
//   } else {
//     console.log(`Server running on port: ${appConfig.port}`);
//   }
// });

app.use('/.netlify/functions/server', app.Router());

module.exports = app;
module.exports.handler = serverless(app);