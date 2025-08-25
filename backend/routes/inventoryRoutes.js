import express from 'express'
import { createInventory, getInventories, updateInventory } from '../controllers/inventoryController.js'
import { protect } from '../middleware/authMiddleware.js'

export const inventoryRouter = express.Router()
inventoryRouter.use(protect)
inventoryRouter.post('/', createInventory)
inventoryRouter.get('/', getInventories)
inventoryRouter.put('/:id', updateInventory)
