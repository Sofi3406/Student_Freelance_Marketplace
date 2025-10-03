# Student_Freelance_Marketplace
# Student Freelance Marketplace


A full-stack freelance marketplace platform connecting students with clients. Built with Node.js, Express, TypeScript, React, Vite, and MongoDB.

## Project Structure

\`\`\`
student-marketplace/
├── backend/                 # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & error middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   └── server.ts       # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── lib/            # Utilities & API client
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main app
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
│
└── scripts/                 # SQL scripts (for reference)
    ├── 01-create-tables.sql
    └── 02-seed-data.sql
\`\`\`

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React

## Features

### For Students
- Create and manage service listings
- Browse and apply to jobs
- Track applications and orders
- Real-time messaging with clients
- Profile management with skills and portfolio
- Review and rating system

### For Clients
- Post job opportunities
- Browse student services
- Review and accept/reject applications
- Order management
- Real-time messaging with students
- Review and rating system

### For Admins
- Platform overview dashboard
- User management
- Service moderation
- Job monitoring
- Analytics and reports

## Getting Started

### Prerequisites
- Node.js v18 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create \`.env\` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update \`.env\` with your configuration:
\`\`\`env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student-marketplace
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
\`\`\`

5. Start the server:
\`\`\`bash
npm run dev
\`\`\`

Backend will run on \`http://localhost:5000\`

### Frontend Setup

1. Navigate to frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create \`.env\` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update \`.env\` if needed:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on \`http://localhost:3000\`

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user
- \`GET /api/auth/me\` - Get current user

### Services
- \`GET /api/services\` - Get all services
- \`POST /api/services\` - Create service (student only)
- \`PUT /api/services/:id\` - Update service
- \`DELETE /api/services/:id\` - Delete service

### Jobs
- \`GET /api/jobs\` - Get all jobs
- \`POST /api/jobs\` - Create job (client only)
- \`GET /api/jobs/:id\` - Get job details
- \`PUT /api/jobs/:id\` - Update job
- \`DELETE /api/jobs/:id\` - Close job

### Applications
- \`GET /api/applications/my-applications\` - Get student applications
- \`POST /api/applications\` - Submit application
- \`PUT /api/applications/:id/status\` - Update application status

### Orders
- \`GET /api/orders/my-orders\` - Get user orders
- \`PUT /api/orders/:id/status\` - Update order status

### Reviews
- \`POST /api/reviews\` - Create review
- \`GET /api/reviews/user/:userId\` - Get user reviews

### Messages
- \`GET /api/messages/conversations\` - Get conversations
- \`GET /api/messages/:userId\` - Get messages with user
- \`POST /api/messages\` - Send message

## Database Schema

### Collections
- **users** - User accounts (students, clients, admins)
- **studentprofiles** - Student-specific data
- **clientprofiles** - Client-specific data
- **services** - Student service listings
- **jobs** - Client job postings
- **applications** - Job applications
- **orders** - Service/job orders
- **reviews** - User reviews and ratings
- **messages** - Direct messages

## Development Workflow

1. **Start MongoDB** (if running locally)
2. **Start Backend:**
   \`\`\`bash
   cd backend && npm run dev
   \`\`\`
3. **Start Frontend:**
   \`\`\`bash
   cd frontend && npm run dev
   \`\`\`
4. **Access the app** at \`http://localhost:3000\`

## Production Deployment

### Backend
\`\`\`bash
cd backend
npm run build
npm start
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm run build
\`\`\`

Deploy the \`dist/\` folder to your hosting service (Vercel, Netlify, etc.)

## Environment Variables

### Backend (.env)
- \`PORT\` - Server port (default: 5000)
- \`NODE_ENV\` - Environment (development/production)
- \`MONGODB_URI\` - MongoDB connection string
- \`JWT_SECRET\` - Secret key for JWT tokens
- \`JWT_EXPIRE\` - Token expiration time

### Frontend (.env)
- \`VITE_API_URL\` - Backend API URL

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for learning or commercial purposes.
\`\`\`
