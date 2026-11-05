# GM Creatives Backend Server

This is a simple Node.js/Express backend for handling contact form emails.

## Setup

### 1. Environment Variables

Update `.env` file with your Gmail credentials:

```
PORT=5000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=kaur04kamal@gmail.com
NODE_ENV=development
```

### 2. Gmail App Password

To use Gmail with Nodemailer, you need an **App Password**, not your regular Gmail password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App passwords**
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Paste it in `.env` as `EMAIL_PASS`

**Important:** Use the app-specific password, NOT your Gmail password.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Server

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### POST `/api/contact`

Send a contact form submission.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "Brand Identity",
  "budget": "₹50,000 - ₹1,00,000",
  "message": "I'd like to discuss a new project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "Server is running"
}
```

## CORS

The server is configured to accept requests from the frontend running on localhost or any origin during development. Update the CORS configuration in production.

## Troubleshooting

**"Invalid login" error:**
- Check that you're using the App Password (16 characters), not your Gmail password
- Ensure 2-Step Verification is enabled on your Google Account

**"ECONNREFUSED" on frontend:**
- Make sure the server is running on port 5000
- Check that `http://localhost:5000` is accessible

**Emails not sending:**
- Check `.env` credentials
- Verify Gmail account security settings
- Check server console logs for errors

## Production Deployment

For production:

1. Use environment variables from your hosting platform
2. Update CORS to only allow your frontend domain
3. Use a production-grade email service (SendGrid, AWS SES, etc.) for better reliability
4. Add rate limiting to prevent abuse
5. Implement captcha on the contact form

Example CORS update for production:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```
