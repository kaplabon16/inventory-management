import React, { useEffect, useState } from "react"
import { getItems } from "../../api/item"
import { useParams, useNavigate } from "react-router-dom"

const ItemList = () => {
  const { inventoryId } = useParams()
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getItems(inventoryId)
        setItems(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchItems()
  }, [inventoryId])

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Items</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div
            key={item.id}
            className="p-4 border rounded cursor-pointer hover:shadow"
            onClick={() => navigate(`/inventory/${inventoryId}/item/${item.id}`)}
          >
            <h3 className="font-semibold">{item.name}</h3>
            <p>Custom ID: {item.customId}</p>
            <p>Likes: {item.likes.length}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList
