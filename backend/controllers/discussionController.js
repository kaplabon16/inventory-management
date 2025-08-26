import { prisma } from '../config/db.js'

export const listMessages = async (req, res) => {
  const { inventoryId } = req.params
  const messages = await prisma.discussion.findMany({
    where: { inventoryId },
    include: { user: true },
    orderBy: { createdAt: 'asc' }
  })
  res.json(messages)
}

export const postMessage = async (req, res) => {
  const { inventoryId, message } = req.body
  const discussion = await prisma.discussion.create({
    data: { inventoryId, message, userId: req.user.id }
  })
  res.json(discussion)
}
