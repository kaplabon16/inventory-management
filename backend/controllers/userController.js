import { prisma } from '../config/db.js'

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
}

export const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } })
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
}

export const updateUserRole = async (req, res) => {
  const { role } = req.body
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { role }
  })
  res.json(user)
}
