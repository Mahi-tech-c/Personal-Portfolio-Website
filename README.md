# Salma Tabassum - Personal Portfolio

A modern, responsive, production-ready full-stack personal portfolio website built with **MERN Stack** (MongoDB, Express, Vanilla JS, Node.js).

## 🌟 Features

### Frontend
- ✨ Modern minimal UI with glassmorphism design
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive (mobile-first design)
- 🎨 Smooth animations and transitions
- ⚡ Fast loading with lazy loading
- 🎯 SEO optimized

### Backend
- 🔐 JWT Authentication
- 📊 RESTful API architecture
- 🗄️ MongoDB database with Mongoose
- ✉️ Email notifications (Nodemailer)
- 🛡️ Security (Helmet, Rate limiting, Input sanitization)
- ✅ Input validation
- 📝 Error handling middleware

### Content Sections
1. **Home** - Hero section with typing animation
2. **About** - Biography, education, experience timeline
3. **Skills** - Categorized skills with progress bars
4. **Projects** - Dynamic project showcase with filtering & pagination
5. **Certificates** - Professional certifications
6. **Achievements** - Awards and recognitions
7. **Contact** - Contact form with email integration

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT for authentication
- Nodemailer for emails

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB Atlas account (free)
- Gmail account (for email notifications)
- Git

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/Mahi-tech-c/Personal-Portfolio-Website.git
cd Personal-Portfolio-Website
```

### 2. Backend Setup

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create `server/.env`:

```env
NODE_ENV=development
PORT=5000

# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=your-email@gmail.com

# Frontend URL
CLIENT_URL=http://127.0.0.1:5500

# Admin Credentials
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123456
```

### 4. Seed Database

```bash
npm run seed
```

### 5. Start Backend Server

```bash
npm run dev
```

Server runs on: http://localhost:5000

### 6. Open Frontend

The frontend is served automatically at http://localhost:3000

Or open `client/index.html` with Live Server.

## 📚 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile information |
| GET | `/api/projects` | Get all projects (with pagination) |
| GET | `/api/projects/:id` | Get single project |
| GET | `/api/skills` | Get all skills (grouped by category) |
| GET | `/api/certificates` | Get all certificates |
| GET | `/api/achievements` | Get all achievements |
| POST | `/api/contact` | Submit contact form |

### Protected Endpoints (Requires JWT Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login and get JWT token |
| PUT | `/api/profile` | Update profile |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/skills` | Create skill |
| PUT | `/api/skills/:id` | Update skill |
| DELETE | `/api/skills/:id` | Delete skill |
| POST | `/api/certificates` | Create certificate |
| PUT | `/api/certificates/:id` | Update certificate |
| DELETE | `/api/certificates/:id` | Delete certificate |
| POST | `/api/achievements` | Create achievement |
| PUT | `/api/achievements/:id` | Update achievement |
| DELETE | `/api/achievements/:id` | Delete achievement |
| GET | `/api/messages` | Get contact messages |
| DELETE | `/api/messages/:id` | Delete message |

## 🎨 Customization

### Update Your Information
- **Profile Data** - Edit in `server/utils/seed.js`
- **Colors** - Edit CSS variables in `client/css/style.css` `:root`
- **Typing Titles** - Edit in `server/utils/seed.js` (typingTitles field)
- **Projects** - Add/edit in `server/utils/seed.js`
- **Skills** - Add/edit in `server/utils/seed.js`

### Update API URL
In `client/js/config.js`:
```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:5000/api' // Development
    // API_BASE_URL: 'https://your-backend-url.com/api' // Production
};
```

## 🚀 Deployment

### Backend Deployment (Railway or Render)

**Railway:**
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select this repository
4. Add environment variables from `.env`
5. Deploy!

**Render:**
1. Go to https://render.com
2. New Web Service → Connect GitHub
3. Select repository
4. Add environment variables
5. Deploy!

### Frontend Deployment (Vercel or Netlify)

**Vercel:**
```bash
npm i -g vercel
cd client
vercel
```

**Netlify:**
1. Go to https://app.netlify.com
2. Drag and drop `client` folder

## 🔒 Security Features

- ✅ Passwords hashed with bcryptjs
- ✅ JWT authentication tokens
- ✅ Rate limiting on API routes
- ✅ Input validation and sanitization
- ✅ Helmet.js for security headers
- ✅ CORS configured
- ✅ MongoDB injection prevention
- ✅ Environment variables for secrets

## 📁 Project Structure

```
├── client/                # Frontend
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── config.js
│   │   ├── api.js
│   │   ├── utils.js
│   │   ├── theme.js
│   │   ├── navigation.js
│   │   ├── animations.js
│   │   ├── sections.js
│   │   └── app.js
│   └── index.html
├── server/                # Backend
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   ├── certificateController.js
│   │   ├── achievementController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Certificate.js
│   │   ├── Achievement.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── certificateRoutes.js
│   │   ├── achievementRoutes.js
│   │   └── contactRoutes.js
│   ├── utils/
│   │   ├── email.js
│   │   └── seed.js
│   ├── validators/
│   │   └── validators.js
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
├── README.md
└── SETUP.md
```

## 📄 License

MIT License - Free to use and modify

## 👤 Author

**Salma Tabassum**
- GitHub: [@Mahi-tech-c](https://github.com/Mahi-tech-c)
- LinkedIn: [Salma Tabassum](https://www.linkedin.com/in/salma-tabassum-31b165320)
- Email: salma3962024@gmail.com

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- MongoDB Atlas for database hosting
- All open-source libraries used

---

Built with ❤️ by Salma Tabassum
