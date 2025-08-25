import { prisma } from '../config/db.js'

export const createInventory = data => prisma.inventory.create({ data })
export const getInventoriesForUser = userId =>
  prisma.inventory.findMany({
    where: { OR: [{ isPublic: true }, { ownerId: userId }] },
    include: { items: true, fields: true, customIDs: true }
  })
export const updateInventory = (id, data) =>
  prisma.inventory.update({ where: { id }, data })
