import { prisma } from '../config/db.js'

export const getMessages = async (req, res) => {
  const messages = await prisma.discussion.findMany({
    where: { inventoryId: req.params.inventoryId },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'asc' }
  })
  res.json(messages)
}

export const postMessage = async (req, res) => {
  const { inventoryId, message } = req.body
  const msg = await prisma.discussion.create({
    data: { inventoryId, message, userId: req.user.id }
  })
  res.status(201).json(msg)
}
