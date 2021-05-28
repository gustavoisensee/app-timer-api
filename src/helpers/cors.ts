// Add 'http://localhost:3000' to test production mode locally
const whitelist = ['https://my-finances-web.netlify.app'];

const isDev = process.env.NODE_ENV === 'development';

const options = {
  origin: (origin, callback) => {
    const isWhitelisted = whitelist.indexOf(origin) >= 0;
    
    if (isWhitelisted || isDev) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS']
};

export default options