import { prisma } from '../config/db.js'

export const listItems = async (req, res) => {
  const { inventoryId } = req.params
  const items = await prisma.item.findMany({ where: { inventoryId } })
  res.json(items)
}

export const getItem = async (req, res) => {
  const { id } = req.params
  const item = await prisma.item.findUnique({ where: { id } })
  if (!item) return res.status(404).json({ message: 'Item not found' })
  res.json(item)
}

export const createItem = async (req, res) => {
  const { inventoryId, name, description, type } = req.body
  const item = await prisma.item.create({
    data: { inventoryId, name, description, type, creatorId: req.user.id }
  })
  res.json(item)
}

export const updateItem = async (req, res) => {
  const { id } = req.params
  const { name, description, type } = req.body
  const item = await prisma.item.update({ where: { id }, data: { name, description, type } })
  res.json(item)
}

export const likeItem = async (req, res) => {
  const { id } = req.params
  const item = await prisma.item.update({
    where: { id },
    data: { likes: { increment: 1 } }
  })
  res.json(item)
}

export const deleteItem = async (req, res) => {
  const { id } = req.params
  await prisma.item.delete({ where: { id } })
  res.json({ message: 'Deleted' })
}
