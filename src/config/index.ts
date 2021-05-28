const isDev = process.env.NODE_ENV === 'development';
const localEnv = isDev ? require('./env').default : null;


const config = {
  app: {
    port: process.env.PORT || localEnv.PORT,
    cryptoSecret: process.env.CRYPTO_SECRET || localEnv.CRYPTO_SECRET
  },
  jwt: {
    expiresToken: process.env.JWT_EXPIRES_TOKEN || localEnv.JWT_EXPIRES_TOKEN,
    secret: process.env.JWT_SECRET || localEnv.JWT_SECRET
  },
  db: {
    path: process.env.DB_PATH || localEnv.DB_PATH,
    name: process.env.DB_NAME || localEnv.DB_NAME
  },
  email: {
    host: process.env.EMAIL_HOST || localEnv.EMAIL_HOST,
    port: process.env.EMAIL_PORT || localEnv.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE || localEnv.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER || localEnv.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD || localEnv.EMAIL_PASSWORD
    },
    pathResetPassword: process.env.EMAIL_PATH_RESET_PASSWORD || localEnv.EMAIL_PATH_RESET_PASSWORD
  }
};

export default config;
