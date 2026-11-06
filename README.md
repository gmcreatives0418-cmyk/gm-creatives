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


# Start the server
npm start
# Server will run on http://localhost:5000
```

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
