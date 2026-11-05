require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: process.env.EMAIL_TO,
  },
  cors: {
    origin:process.env.FRONTEND_URL,
    credentials: true,
  },
  nodeEnv: process.env.NODE_ENV,
};
