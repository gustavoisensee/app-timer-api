if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;
const app = require('./src/app');
const routes = require('./src/routes');

app.use(routes);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Listening at http://localhost:${port}`);
});
