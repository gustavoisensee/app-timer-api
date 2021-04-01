const cors = require('cors');

const options = {
  origin: [
    'https://my-finances-web.netlify.app'
  ]
};

const customCors = () => cors(options);

module.exports = customCors;