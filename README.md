# AI Finance Analyzer 💰

A modern, AI-powered personal finance management application built with Next.js that helps you track expenses, visualize spending patterns, and get intelligent insights to optimize your financial health.

![AI Finance Analyzer](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-6.17.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📊 **Smart Analytics**
- **Expense Tracking**: Log income and expenses with categories
- **Visual Charts**: Interactive pie charts and graphs for spending breakdown
- **Time Filters**: View data by day, week, month, or year
- **Real-time Updates**: Instant transaction updates and calculations

### 🤖 **AI-Powered Insights**
- **One-liner Summaries**: Quick overview of your financial status
- **Detailed Reports**: Comprehensive analysis with actionable recommendations
- **Smart Categorization**: Automatic expense categorization
- **Trend Analysis**: Identify spending patterns and anomalies

### 🔐 **Secure Authentication**
- **NextAuth.js Integration**: Secure user authentication
- **Google OAuth**: Quick sign-in with Google accounts
- **Session Management**: Persistent login sessions
- **Protected Routes**: Secure dashboard access

### 📱 **Modern UI/UX**

- **Intuitive Interface**: Clean, modern design with smooth animations
- **Real-time Feedback**: Toast notifications and loading states

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.3** - React framework with App Router
- **React 19.0.0** - UI library
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication framework
- **bcryptjs** - Password hashing

### Development Tools
- **Turbopack** - Fast bundler for development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **DaisyUI** - Component library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Google OAuth credentials (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhruvdeepChakravorty/AI-Finance-Analyzer.git
   cd AI-Finance-Analyzer/finance-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server**
```bash
npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### 1. **Sign Up/Login**
- Create an account or sign in with Google
- Secure authentication with NextAuth.js

### 2. **Add Transactions**
- Navigate to the dashboard
- Click "Add Transaction" button
- Fill in amount, category, description, and date
- Submit to save your transaction

### 3. **View Analytics**
- **Pie Chart**: See spending breakdown by category
- **Time Filters**: Switch between different time periods
- **Transaction List**: View all your transactions with search and filter

### 4. **AI Insights**
- Get one-liner summaries of your financial status
- Access detailed reports with recommendations
- Identify spending patterns and optimization opportunities

### 5. **Manage Transactions**
- Edit existing transactions
- Delete unwanted entries
- Bulk operations for multiple transactions

## 🏗️ Project Structure

```
finance-analyzer/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── add-transaction/
│   │   │   ├── ai-insight/
│   │   │   ├── auth/
│   │   │   ├── delete-transaction/
│   │   │   └── get-transaction/
│   │   ├── dashboard/         # Dashboard page
│   │   ├── login/            # Login page
│   │   └── sign-up/          # Sign up page
│   ├── components/           # React components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   └── ui/              # Reusable UI components
│   ├── controllers/         # Business logic
│   ├── lib/                 # Utilities and configurations
│   └── models/              # Database models
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## 🔧 API Endpoints

- `POST /api/add-transaction` - Add new transaction
- `GET /api/get-transaction` - Fetch all transactions
- `DELETE /api/delete-transaction/[id]` - Delete transaction
- `POST /api/ai-insight` - Get AI-powered insights
- `POST /api/auth/sign-up` - User registration
- `GET /api/auth/[...nextauth]` - NextAuth.js routes

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
- **Netlify**: Configure build settings for Next.js
- **Railway**: Deploy with MongoDB integration
- **Heroku**: Use Next.js buildpack

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 👨‍💻 Author

**Dhruvdeep Chakravorty**
- GitHub: [@dhruvdeepChakravorty](https://github.com/dhruvdeepChakravorty)
- LinkedIn: [@Dhruvdeep Chakravorty](https://www.linkedin.com/in/dhruvdeep-chakravorty-405772331/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Recharts](https://recharts.org/) for beautiful charts
- [NextAuth.js](https://next-auth.js.org/) for authentication


---

⭐ **Star this repository if you found it helpful!**
