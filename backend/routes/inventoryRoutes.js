import express from 'express'
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { listInventories, getInventory, createInventory, updateInventory, deleteInventory } from '../controllers/inventoryController.js'

const router = express.Router()

router.get('/', isAuthenticated, listInventories)
router.get('/:id', isAuthenticated, getInventory)
router.post('/', isAuthenticated, createInventory)
router.put('/:id', isAuthenticated, updateInventory)
router.delete('/:id', isAuthenticated, deleteInventory)

export default router
