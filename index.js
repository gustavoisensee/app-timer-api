if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;
const app = require('./src/app.js');

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
