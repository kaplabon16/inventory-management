import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
import './config/passport.js'

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)

app.use(errorHandler)

export default app
