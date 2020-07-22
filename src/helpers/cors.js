const cors = require('cors');

const customCors = () => cors({
  origin: [
    'https://my-finances-web.netlify.app',
    'http://localhost:3000',
  ]
});


module.exports = customCors;