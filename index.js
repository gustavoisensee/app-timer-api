const app = require('./src/app.js');
const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.log(`Error: something went wrong: ${e}`);
    throw err;
  } else {
    console.log(`Server running on port: ${PORT}`);
  }
});