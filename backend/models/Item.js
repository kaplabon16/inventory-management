import { prisma } from '../config/db.js'

export const createItem = data => prisma.item.create({ data })
export const updateItem = (id, data) => prisma.item.update({ where: { id }, data })
export const likeItem = id => prisma.item.update({ where: { id }, data: { likes: { increment: 1 } } })
