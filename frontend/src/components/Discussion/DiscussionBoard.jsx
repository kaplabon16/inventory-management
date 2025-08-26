import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"

const socket = io(import.meta.env.VITE_BACKEND_URL)

const DiscussionBoard = () => {
  const { inventoryId } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    socket.emit("joinInventory", inventoryId)

    socket.on("discussionMessages", (msgs) => {
      setMessages(msgs)
    })

    socket.on("newMessage", (msg) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      socket.emit("leaveInventory", inventoryId)
      socket.off("discussionMessages")
      socket.off("newMessage")
    }
  }, [inventoryId])

  const sendMessage = () => {
    if (!input.trim()) return
    socket.emit("sendMessage", { inventoryId, message: input })
    setInput("")
  }

  return (
    <div className="max-w-lg p-4">
      <h2 className="mb-4 text-xl font-bold">Discussion</h2>
      <div className="h-64 p-2 mb-4 overflow-y-auto border rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold">{msg.user.username}: </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  )
}

export default DiscussionBoard
