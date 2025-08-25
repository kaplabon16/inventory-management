import express from 'express'
import { getUsers, getUser, updateUserRole } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

export const userRouter = express.Router()
userRouter.use(protect)
userRouter.get('/', admin, getUsers)
userRouter.get('/:id', getUser)
userRouter.put('/:id/role', admin, updateUserRole)
