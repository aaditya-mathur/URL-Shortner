# URL Shortener

A full-stack URL shortening service built with TypeScript, featuring user authentication, custom short codes, and click tracking.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Create Short URLs**: Generate shortened links with auto or custom codes
- **Click Tracking**: Monitor how many times each link is visited
- **CRUD Operations**: Create, view, update, and delete your shortened URLs
- **Dark Theme UI**: Clean, modern interface with minimalist design
- **Rate Limiting**: Protection against abuse with request limits
- **Secure**: Password hashing with bcrypt, protected routes with JWT

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Zod** for request validation
- **nanoid** for generating short codes
- **express-rate-limit** for API protection

### Frontend
- **React** with **TypeScript**
- **Vite** for build tooling
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Tailwind CSS** for styling

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or pnpm

### Backend Setup
```bash
cd backend
npm install

# Create .env file with:
# DATABASE_URL=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# ACCESS_TOKEN_EXPIRY=7d
# PORT=8000

# Run development server
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Run development server
npm run dev
```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/login` - Login user (rate limited: 3/hour)
- `POST /api/v1/url/logout` - Logout user

### URL Management
- `POST /api/v1/url/shorten` - Create shortened URL (rate limited: 10/hour)
- `GET /api/v1/url/codes` - Get all user's URLs
- `GET /api/v1/url/codes/:id` - Get specific URL
- `PATCH /api/v1/url/codes/:id` - Update URL
- `DELETE /api/v1/url/codes/:id` - Delete URL
- `GET /:shortCode` - Redirect to target URL

## 🚀 Running Locally

1. Clone the repository
2. Follow installation instructions above
3. Backend runs on `http://localhost:8000`
4. Frontend runs on `http://localhost:5173`

## 📝 Environment Variables

### Backend
```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=7d
PORT=8000
```

### Frontend
```env
VITE_API_URL=http://localhost:8000/api/v1
```

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT authentication with httpOnly cookies
- Protected API routes with middleware
- Request validation with Zod
- Rate limiting (3 login attempts/hour, 10 URL creations/hour)
- CORS configuration

## 🎯 Future Enhancements

- QR code generation for short URLs
- Analytics dashboard with charts
- Custom domains support
- Bulk URL creation
- URL expiration dates
- Deployment to production

---

*Portfolio project demonstrating full-stack development with TypeScript*