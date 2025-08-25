import express from 'express'
import { getMessages, postMessage } from '../controllers/discussionController.js'
import { protect } from '../middleware/authMiddleware.js'

export const discussionRouter = express.Router()
discussionRouter.use(protect)
discussionRouter.get('/:inventoryId', getMessages)
discussionRouter.post('/', postMessage)
