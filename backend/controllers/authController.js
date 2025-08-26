import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'

export const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ message: 'Email already exists' })

  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { name, email, password: hash, role: 'user' } })
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

  res.json({ token, user })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
  res.json({ token, user })
}
