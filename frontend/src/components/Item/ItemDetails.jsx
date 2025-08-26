import React, { useEffect, useState } from "react"
import { getItem, likeItem } from "../../api/item"
import { useParams } from "react-router-dom"

const ItemDetails = () => {
  const { inventoryId, itemId } = useParams()
  const [item, setItem] = useState(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getItem(inventoryId, itemId)
        setItem(res.data)
        setLiked(res.data.likes.includes(localStorage.getItem("userId")))
      } catch (err) {
        console.error(err)
      }
    }
    fetchItem()
  }, [inventoryId, itemId])

  const handleLike = async () => {
    try {
      await likeItem(inventoryId, itemId)
      setLiked(!liked)
      setItem({ ...item, likes: liked ? item.likes.filter(id => id !== localStorage.getItem("userId")) : [...item.likes, localStorage.getItem("userId")] })
    } catch (err) {
      console.error(err)
    }
  }

  if (!item) return <p className="p-4">Loading...</p>

  return (
    <div className="max-w-md p-4">
      <h2 className="mb-2 text-xl font-bold">{item.name}</h2>
      <p className="mb-2">Custom ID: {item.customId}</p>
      <p className="mb-2">{item.description}</p>
      <p className="mb-2">Likes: {item.likes.length}</p>
      <button
        onClick={handleLike}
        className={`p-2 rounded ${liked ? "bg-red-500 text-white" : "bg-gray-300"}`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
    </div>
  )
}

export default ItemDetails
