import { prisma } from '../config/db.js'

export const createField = data => prisma.field.create({ data })
export const updateFieldOrder = (id, order) => prisma.field.update({ where: { id }, data: { order } })
export const deleteField = id => prisma.field.delete({ where: { id } })
