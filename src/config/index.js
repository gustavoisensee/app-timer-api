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
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD
    }
  }
};

module.exports = config;
