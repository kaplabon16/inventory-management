import { prisma } from '../config/db.js'

export const getMessages = inventoryId =>
  prisma.discussion.findMany({
    where: { inventoryId },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'asc' }
  })

export const postMessage = data => prisma.discussion.create({ data })
