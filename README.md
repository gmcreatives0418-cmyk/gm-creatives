# GM Creatives - Production Ready Website

A modern, responsive React frontend for GM Creatives services website featuring dark hero design, service showcase, case studies, and working contact form with email integration.

## 🎨 Features

- **Beautiful Design**: Red (#A31621) and white theme with dark hero gradient
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **8 Services**: Each with custom SVG icons
- **Case Studies**: 6 detailed case study pages with Challenge → Solution → Approach → Results
- **Contact Form**: Functional contact form that sends emails to `gmcreatives0418@gmail.com`
- **Instagram Integration**: Social links point to Instagram only
- **Performance**: Optimized build (261 KB JS, 59 KB CSS)
- **React Router**: 6 pages with smooth navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### 1. Setup and Run Backend (Email Server)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
# Edit .env and add your Gmail App Password
# See SETUP_EMAIL.md for detailed instructions
nano .env

# Start the server
npm start
# Server will run on http://localhost:5000
```

**Important:** You need a Gmail App Password. See [SETUP_EMAIL.md](./SETUP_EMAIL.md) for complete setup instructions.

### 2. Setup and Run Frontend (in a new terminal)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend will run on http://localhost:5173
```

### 3. Test the Website

Open http://localhost:5173 in your browser and:
- Browse through the home page sections
- Navigate to Services, About, and Work pages
- Click "View Case Study" to see detailed case studies
- Fill out the contact form and submit
- Check your email for the submission and confirmation

## 📁 Project Structure

```
gm-creatives/
├── client/                          # Frontend React app
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Brands.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Process.jsx
│   │   │   └── Contact.jsx
│   │   ├── pages/                  # Page components
│   │   │   ├── ServicesDetailPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── WorkPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── CaseStudyPage.jsx
│   │   ├── hooks/                  # Custom hooks
│   │   │   └── useScrollReveal.js  # IntersectionObserver for animations
│   │   ├── assets/
│   │   │   └── images/             # All logos and images
│   │   ├── styles/
│   │   │   └── global.css          # Global styles + animations
│   │   └── App.jsx                 # React Router setup
│   ├── .env.local                  # Environment variables for dev
│   ├── package.json
│   └── vite.config.js
├── server/                          # Backend Node.js/Express
│   ├── server.js                   # Main server
│   ├── config.js                   # Configuration
│   ├── .env                        # (not committed) Gmail credentials
│   ├── package.json
│   └── README.md                   # Server documentation
├── SETUP_EMAIL.md                  # Email setup guide
└── README.md                       # This file
```

## 📄 Pages

### Home (/)
- Hero section with gradient background
- Services showcase (first 4 services)
- Brand marquee with 12 brand logos
- Stats section with animated counters
- Process/Timeline section
- Contact CTA section

### Services (/services)
All 8 services with descriptions and SVG icons:
1. Brand Identity
2. Graphic Design
3. Motion Design
4. UI/UX Design
5. Web Design
6. Web Development
7. Digital Marketing
8. Google & Meta Ads

### About (/about)
Company overview and values (customize with your content)

### Work (/work)
Showcase of completed projects with links to individual case studies

### Case Studies (/case-study/:slug)
6 detailed case studies:
- Brand Identity Project
- E-commerce Redesign
- Social Media Campaign
- Motion Graphics Project
- SaaS Dashboard
- Google Ads Campaign

Each includes:
- Challenge
- Solution
- Approach
- Results

### Contact (/contact)
Contact form with fields for:
- Name, Email
- Service of interest
- Budget range
- Project details

## 🛠️ Build and Deployment

### Frontend Build
```bash
cd client
npm run build
# Output: dist/ folder ready for deployment
```

### Frontend Deployment Options
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Configure in settings
- **Traditional hosting**: Upload `dist/` folder via FTP

### Backend Deployment
See `server/README.md` for deployment instructions to:
- Heroku
- Railway
- AWS Lambda
- Your own server

### Environment Variables for Production
**Frontend** (set in deployment platform):
```
VITE_API_URL=https://your-backend-url.com
```

**Backend** (set in deployment platform):
```
PORT=5000
EMAIL_USER=gmcreatives0418@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=gmcreatives0418@gmail.com
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
```

## 📧 Email Setup

The contact form requires:
1. Gmail account with 2-Step Verification enabled
2. Gmail App Password (16 characters)
3. Backend server running with `.env` configured

**See [SETUP_EMAIL.md](./SETUP_EMAIL.md) for complete setup instructions.**

## 🎯 Key Features Explained

### Scroll Reveal Animations
Elements fade in and slide up as you scroll using the `useScrollReveal()` hook powered by IntersectionObserver.

### Responsive Design
Mobile-first approach using CSS Grid and Flexbox. All breakpoints tested on:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Ultra-wide (1440px+)

### Performance
- **Production build**: 261 KB JS, 59 KB CSS (gzipped: 81 KB + 10 KB)
- **85 modules**: Optimized with Vite
- **Images**: Lazy loaded and optimized
- **CSS**: Critical styles inline, rest deferred

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliant

## 🔧 Customization

### Change Brand Colors
Edit `client/src/styles/global.css`:
```css
:root {
  --color-primary: #A31621; /* Red */
  --color-background: #ffffff;
}
```

### Update Service Details
Edit `client/src/components/Services.jsx` and `client/src/pages/ServicesDetailPage.jsx`

### Update Case Studies
Edit `client/src/pages/CaseStudyPage.jsx` in the `CASE_STUDIES` object

### Add/Remove Brand Logos
Edit `client/src/components/Brands.jsx` and add/remove imports and images

### Change Contact Email
- Backend: Update `server/.env` → `EMAIL_TO`
- Frontend: Update contact messages in `client/src/pages/ContactPage.jsx`

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## ⚠️ Security Notes

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use environment variables** on all deployment platforms
3. **Update CORS** in `server/config.js` for production
4. **Consider rate limiting** the contact form to prevent spam
5. **Add CAPTCHA** to contact form for production

## 🐛 Troubleshooting

### Contact form not sending emails?
See [SETUP_EMAIL.md](./SETUP_EMAIL.md) troubleshooting section

### Build errors?
```bash
cd client
rm -r node_modules dist
npm install
npm run build
```

### Frontend can't reach backend?
- Check backend is running on http://localhost:5000
- Verify `.env.local` has correct `VITE_API_URL`
- Check browser console for CORS errors

### Animations not working?
- Clear browser cache
- Ensure `global.css` is loaded
- Check browser DevTools for JavaScript errors

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review the specific documentation (SETUP_EMAIL.md, server/README.md)
3. Check browser console (F12) for errors
4. Check backend console logs

## 📄 License

All rights reserved - GM Creatives

## 🎉 Ready to Launch?

1. ✅ Frontend built and tested
2. ✅ Backend configured and running
3. ✅ Emails sending to gmcreatives0418@gmail.com
4. ✅ All pages functional
5. ✅ Responsive on all devices

**Deploy to production and start accepting projects!** 🚀
