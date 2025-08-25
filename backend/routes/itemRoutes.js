import express from 'express'
import { createItem, updateItem, likeItem } from '../controllers/itemController.js'
import { protect } from '../middleware/authMiddleware.js'

export const itemRouter = express.Router()
itemRouter.use(protect)
itemRouter.post('/', createItem)
itemRouter.put('/:id', updateItem)
itemRouter.post('/:id/like', likeItem)
