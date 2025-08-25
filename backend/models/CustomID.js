import { prisma } from '../config/db.js'

export const createCustomID = data => prisma.customID.create({ data })
export const findCustomID = (inventoryId, value) => prisma.customID.findUnique({ where: { inventoryId_value: { inventoryId, value } } })
