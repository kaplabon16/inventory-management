import express from 'express'
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { listItems, getItem, createItem, updateItem, deleteItem, likeItem } from '../controllers/itemController.js'

const router = express.Router()

router.get('/:inventoryId', isAuthenticated, listItems)
router.get('/item/:id', isAuthenticated, getItem)
router.post('/', isAuthenticated, createItem)
router.put('/:id', isAuthenticated, updateItem)
router.delete('/:id', isAuthenticated, deleteItem)
router.post('/:id/like', isAuthenticated, likeItem)

export default router
