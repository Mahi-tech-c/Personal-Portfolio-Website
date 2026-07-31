# Complete Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB Atlas Account (Free)
- Gmail Account
- Git

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Mahi-tech-c/Personal-Portfolio-Website.git
cd Personal-Portfolio-Website
```

### 2. MongoDB Atlas Setup (5 minutes)

**Create Account:**
- Go to https://www.mongodb.com/cloud/atlas
- Sign up with Google or Email

**Create Cluster:**
- Click "Build a Cluster"
- Choose "Free" tier
- Select region closest to you
- Click "Create Cluster"
- Wait 5-10 minutes

**Create Database User:**
- Left sidebar → "Database Access"
- Click "Add New Database User"
- Username: admin
- Password: Create strong password (save it!)
- Click "Add User"

**Whitelist IP:**
- Left sidebar → "Network Access"
- Click "Add IP Address"
- Click "Allow access from anywhere"
- Click "Confirm"

**Get Connection String:**
- Go to "Clusters" → Click "Connect"
- Choose "Drivers"
- Copy connection string
- Format: `mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

### 3. Gmail App Password Setup (5 minutes)

1. Go to https://myaccount.google.com/
2. Click "Security"
3. Enable "2-Step Verification" (if not enabled)
4. Scroll to "App passwords"
5. Select "Mail" and your device
6. Google generates 16-character password
7. Copy it (remove spaces)

### 4. Backend Setup (5 minutes)

```bash
cd server
npm install
```

Create `.env` file:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

JWT_SECRET=salma_portfolio_secret_key_2024
JWT_EXPIRE=7d

EMAIL_SERVICE=gmail
EMAIL_USER=salma3962024@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
EMAIL_FROM=salma3962024@gmail.com

CLIENT_URL=http://127.0.0.1:5500

ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Salma@123456
```

### 5. Seed Database

```bash
npm run seed
```

Expected output:
```
✅ MongoDB Connected
✅ Admin user created
✅ Profile created
✅ Projects created
✅ Skills created
✅ Certificates created
✅ Achievements created

🎉 DATABASE SEEDED SUCCESSFULLY!

Admin Credentials:
Email: admin@portfolio.com
Password: Salma@123456
```

### 6. Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📝 Mode: development
```

### 7. Open Frontend

The frontend is served automatically at **http://localhost:5000**

Or open `client/index.html` with VS Code Live Server.

## ✅ Testing Checklist

- [ ] Homepage loads with your profile
- [ ] All sections load data from API
- [ ] Skills show progress bars
- [ ] Projects can be filtered
- [ ] Contact form sends email
- [ ] Dark mode toggle works
- [ ] Mobile responsive (check on phone)

## 🔗 API Testing

```bash
# Get profile
curl http://localhost:5000/api/profile

# Get projects
curl http://localhost:5000/api/projects

# Get skills
curl http://localhost:5000/api/skills
```

## 🎨 Customization

### Update Your Data
Edit `server/utils/seed.js` and change:
- Name, email, phone
- Projects, skills, certifications
- Education, experience
- Social links

Then run: `npm run seed`

### Update Colors
Edit `client/css/style.css` `:root` variables

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check MONGO_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Make sure password has no special characters unescaped

### Email Not Sending
- Use Gmail app password (not regular password)
- Enable 2-Step Verification on Gmail
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASS

### Frontend not loading data
- Open browser console (F12)
- Check for errors
- Verify backend is running
- Check API_BASE_URL in client/js/config.js

### Port 5000 already in use
```bash
# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## 🚀 Deployment

### Deploy Backend to Railway

```bash
npm i -g @railway/cli
railway login
cd server
railway init
railway variables  # Add env vars
railway up
```

Get your backend URL and update `client/js/config.js`

### Deploy Frontend to Vercel

```bash
npm i -g vercel
cd client
vercel
```

---

Happy coding! 🚀
