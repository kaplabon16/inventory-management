import { prisma } from '../config/db.js'

export const createItem = async (req, res) => {
  const { inventoryId, name, description, data } = req.body
  const item = await prisma.item.create({
    data: { inventoryId, name, description, data, createdById: req.user.id }
  })
  res.status(201).json(item)
}

export const updateItem = async (req, res) => {
  const { name, description, data, version } = req.body
  const item = await prisma.item.findUnique({ where: { id: req.params.id } })
  if (!item) return res.status(404).json({ message: 'Item not found' })
  if (item.version !== version) return res.status(409).json({ message: 'Version conflict' })

  const updated = await prisma.item.update({
    where: { id: req.params.id },
    data: { name, description, data, version: { increment: 1 } }
  })
  res.json(updated)
}

export const likeItem = async (req, res) => {
  const item = await prisma.item.update({
    where: { id: req.params.id },
    data: { likes: { increment: 1 } }
  })
  res.json(item)
}
