#📚 PocketPal++

**PocketPal++** is a powerful full-stack web-based companion app designed specifically for students.  
It combines finance tracking, productivity management, to-do lists, and study organization — all in one beautiful and intuitive platform.

---

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 📊 Finance Module
- Expense & income tracking
- Pie charts, filters, and analytics
- AI insights (Coming Soon)
- Real-time feedback and updates

### ✅ Productivity Suite
- To-Do Task Manager (Coming Soon)
- Smart Reminders
- Study Scheduler & Calendar

### 🔐 Authentication
- Google OAuth via NextAuth.js
- Secure routes and session management

### 🎨 Beautiful UI/UX
- Smooth transitions, interactive charts
- Fully responsive for all screen sizes
- Light/Dark mode (optional upcoming)

---

## 🔧 Tech Stack

| Layer      | Technology                               |
|------------|-------------------------------------------|
| Frontend   | Next.js (App Router), React 19, Tailwind  |
| Backend    | Next.js API Routes, MongoDB, Mongoose     |
| Auth       | NextAuth.js + Google OAuth                |
| Forms      | React Hook Form + Zod                     |
| Charts     | Recharts                                  |
| Styling    | Tailwind CSS, Radix UI, DaisyUI           |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pocketpal.git
cd pocketpal

2. Install dependencies
bash
Copy
Edit
npm install

3. Setup Environment Variables
Create a .env.local file in root:

env
Copy
Edit
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


4. Run the app
bash
Copy
Edit
npm run dev
Visit: http://localhost:3000

🧠 Usage
Feature	What It Does
Dashboard	View financial overview & stats
Add Transaction	Add income/expense with details
Transaction List	View, delete, or search entries
Productivity Tools	[Coming Soon] To-do list, Scheduler

🏗️ Project Structure
csharp
Copy
Edit
pocketpal/
├── src/
│   ├── app/             # Pages & routing
│   ├── components/      # Reusable components
│   ├── controllers/     # Business logic
│   ├── lib/             # Utility functions
│   ├── models/          # DB Schemas (Mongoose)
├── public/              # Static files
├── .env.local           # Your environment variables
└── package.json         # Dependencies



📡 API Endpoints
Endpoint	Description
GET /api/get-transaction	Fetch all transactions
POST /api/add-transaction	Add a transaction
DELETE /api/delete-transaction/:id	Delete one
POST /api/auth/*	NextAuth auth routes

📦 Deployment
Recommended: Vercel

Auto-deploy from GitHub

Set environment variables in dashboard

Other options: Railway, Render, Netlify (with Next adapter)

👨‍💻 Developer
Rishabh Singh

GitHub: @yourgithubusername

LinkedIn: @YourLinkedIn

🙏 Acknowledgments
Next.js

Tailwind CSS

Radix UI

Recharts

MongoDB

NextAuth.js