import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Not authorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!req.user) return res.status(401).json({ message: 'User not found' })
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export const admin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' })
  next()
}
