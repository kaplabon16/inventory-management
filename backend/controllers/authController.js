import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' })
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return res.status(400).json({ message: 'User already exists' })

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { name, email, password: hashed } })
  res.status(201).json({ token: generateToken(user.id), user })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ message: 'Invalid credentials' })
  res.json({ token: generateToken(user.id), user })
}
