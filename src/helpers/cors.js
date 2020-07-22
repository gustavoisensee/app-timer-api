const cors = require('cors');

const customCors = () => cors({
  origin: [
    'https://my-finances-web.netlify.com/',
    'https://my-finances-web.netlify.app/',
  ]
});


module.exports = customCors;