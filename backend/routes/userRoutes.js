import express from 'express'
import { getProfile, updateProfile, listUsers } from '../controllers/userController.js'
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/me', isAuthenticated, getProfile)
router.put('/me', isAuthenticated, updateProfile)
router.get('/', isAuthenticated, isAdmin, listUsers)

export default router
