import { prisma } from '../config/db.js'

export const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true }
  })
  res.json(user)
}

export const updateProfile = async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { name, email }
  })
  res.json(user)
}

export const listUsers = async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
}
