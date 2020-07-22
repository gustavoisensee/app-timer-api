const cors = require('cors');

const whitelist = [
  'https://my-finances-web.netlify.app',
  'http://localhost:3000'
];

const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

const customCors = () => cors(options);


module.exports = customCors;