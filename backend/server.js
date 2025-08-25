import app from './app.js'
import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL } })

io.on('connection', socket => {
  console.log('Socket connected:', socket.id)
  socket.on('joinRoom', room => socket.join(room))
  socket.on('sendMessage', data => io.to(data.room).emit('receiveMessage', data))
})

const PORT = process.env.PORT || 5043
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
