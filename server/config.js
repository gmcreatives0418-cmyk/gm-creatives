require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: process.env.EMAIL_TO,
  },
  cors: {
    origin: [
  "https://gm-creatives.vercel.app",
  "http://localhost:5173"
],
    credentials: true,
  }
};
