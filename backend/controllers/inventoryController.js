import { prisma } from '../config/db.js'

export const listInventories = async (req, res) => {
  const inventories = await prisma.inventory.findMany({
    where: { OR: [{ ownerId: req.user.id }, { isPublic: true }] },
    include: { items: true, fields: true, customIDs: true }
  })
  res.json(inventories)
}

export const getInventory = async (req, res) => {
  const { id } = req.params
  const inventory = await prisma.inventory.findUnique({
    where: { id },
    include: { items: true, fields: true, customIDs: true, discussions: true }
  })
  if (!inventory) return res.status(404).json({ message: 'Inventory not found' })
  res.json(inventory)
}

export const createInventory = async (req, res) => {
  const { name, description, isPublic } = req.body
  const inventory = await prisma.inventory.create({
    data: { name, description, isPublic, ownerId: req.user.id }
  })
  res.json(inventory)
}

export const updateInventory = async (req, res) => {
  const { id } = req.params
  const { name, description, isPublic, version } = req.body
  const inventory = await prisma.inventory.updateMany({
    where: { id, version },
    data: { name, description, isPublic, version: { increment: 1 } }
  })
  if (inventory.count === 0) return res.status(409).json({ message: 'Conflict: Optimistic lock failed' })
  res.json({ message: 'Updated successfully' })
}

export const deleteInventory = async (req, res) => {
  const { id } = req.params
  await prisma.inventory.delete({ where: { id } })
  res.json({ message: 'Deleted' })
}
