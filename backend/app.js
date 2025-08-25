import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import { authRouter } from './routes/authRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { inventoryRouter } from './routes/inventoryRoutes.js'
import { itemRouter } from './routes/itemRoutes.js'
import { discussionRouter } from './routes/discussionRoutes.js'
import './config/passport.js'
import { errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(passport.initialize())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/inventories', inventoryRouter)
app.use('/api/items', itemRouter)
app.use('/api/discussions', discussionRouter)

app.use(errorHandler)

export default app
