import { prisma } from '../config/db.js'

export const findUserById = id => prisma.user.findUnique({ where: { id } })
export const findUserByEmail = email => prisma.user.findUnique({ where: { email } })
export const createUser = data => prisma.user.create({ data })
export const updateUserRole = (id, role) => prisma.user.update({ where: { id }, data: { role } })
