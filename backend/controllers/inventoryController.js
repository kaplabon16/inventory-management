import { prisma } from '../config/db.js'

export const createInventory = async (req, res) => {
  const { name, description, isPublic } = req.body
  const inventory = await prisma.inventory.create({
    data: { name, description, isPublic, ownerId: req.user.id }
  })
  res.status(201).json(inventory)
}

export const getInventories = async (req, res) => {
  const inventories = await prisma.inventory.findMany({
    where: { OR: [{ isPublic: true }, { ownerId: req.user.id }] },
    include: { items: true, fields: true, customIDs: true }
  })
  res.json(inventories)
}

export const updateInventory = async (req, res) => {
  const { name, description, isPublic, version } = req.body
  const inv = await prisma.inventory.findUnique({ where: { id: req.params.id } })
  if (!inv) return res.status(404).json({ message: 'Inventory not found' })
  if (inv.version !== version) return res.status(409).json({ message: 'Version conflict' })

  const updated = await prisma.inventory.update({
    where: { id: req.params.id },
    data: { name, description, isPublic, version: { increment: 1 } }
  })
  res.json(updated)
}
