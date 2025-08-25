# 🔗 Gepify — Social Media Link Shortener

**Gepify** makes long, messy links look clean and professional — perfect for sharing on Instagram, TikTok, Twitter/X, LinkedIn, and more.  

## ✨ Why Gepify?
- 🎯 Built for **social media creators, influencers, and marketers**
- 🔗 Turn long URLs into **short, branded links**
- 📊 Track clicks to see **what content drives engagement**
- 🧑‍💻 Customize your short link (e.g., gepify.com/mybrand)
- 📱 Optimized for **sharing across platforms**

## 🛠 Tech Stack
- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: React (with Axios)
- **Database**: PostgreSQL
- **Utilities**: nanoid, dotenv, cors

## 🚀 Run Locally

### Clone repo
```bash
git clone https://github.com/kuyagep/gepify.git
cd gepify

cd backend
npm install
cp .env.example .env
npm run dev

cd frontend
npm install
npm start

gepify/
│── backend/      # Express API
│── frontend/     # React app (UI)
│── README.md
