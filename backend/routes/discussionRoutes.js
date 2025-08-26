import express from 'express'
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { listMessages, postMessage } from '../controllers/discussionController.js'

const router = express.Router()

router.get('/:inventoryId', isAuthenticated, listMessages)
router.post('/', isAuthenticated, postMessage)

export default router
