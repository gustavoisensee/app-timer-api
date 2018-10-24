// https://github.com/auth0/node-jsonwebtoken
const config = {
  app: {
    port: process.env.PORT
  },
  jwt: {
    expiresToken: process.env.JWT_EXPIRES_TOKEN,
    secret: process.env.JWT_SECRET
  },
  db: {
    path: process.env.DB_PATH,
    name: process.env.DB_NAME
  }
};

module.exports = config;
