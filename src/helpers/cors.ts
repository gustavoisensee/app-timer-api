const whitelist = ['https://my-finances-web.netlify.app'];

const isDev = process.env.NODE_ENV === 'development';

const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || isDev) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS']
};

export default options