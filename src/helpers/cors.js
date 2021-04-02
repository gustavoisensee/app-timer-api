const cors = require('cors');

const options = {
  origin: [
    'https://my-finances-web.netlify.app'
  ],
  methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
};

const customCors = () => cors(options);

module.exports = customCors;