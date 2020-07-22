const cors = require('cors');

const whitelist = [
  'https://my-finances-web.netlify.app'
];

const isDevelopment = process.env.NODE_ENV === 'development';

const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || isDevelopment) {
      callback(null, true);
    } else {
      callback('Not allowed by CORS');
    }
  },
  optionsSuccessStatus: 200
};

const customCors = () => cors(options);

module.exports = customCors;