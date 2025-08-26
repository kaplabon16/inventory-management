import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import discussionRoutes from './routes/discussionRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'

// Load environment variables
dotenv.config()

// Import Passport strategies (Google, GitHub)
import './config/passport.js'

const app = express()

// Enable CORS with credentials (cookies)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)

// JSON body parsing
app.use(express.json())

// Express session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === 'production', // true if HTTPS
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
  })
)

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/inventories', inventoryRoutes)
app.use('/items', itemRoutes)
app.use('/discussions', discussionRoutes)

// Error handling middleware
app.use(errorHandler)

export default app
