require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  port: process.env.PORT,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: process.env.EMAIL_TO,
  },
  cors: {
    origin: isDev ? ['http://localhost:5173', 'http://localhost:3000'] : process.env.FRONTEND_URL,
    credentials: true,
  },
  nodeEnv: process.env.NODE_ENV,
};
