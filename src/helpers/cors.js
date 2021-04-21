const whitelist = ['https://my-finances-web.netlify.app'];

const options = {
  // origin: [
  //   'https://my-finances-web.netlify.app'
  // ],
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};

module.exports = options;