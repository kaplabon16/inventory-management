import React, { useEffect, useState } from "react"
import { getInventories } from "../../api/inventory"
import { useNavigate } from "react-router-dom"

const InventoryList = () => {
  const [inventories, setInventories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const res = await getInventories()
        setInventories(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInventories()
  }, [])

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Your Inventories</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {inventories.map(inv => (
          <div
            key={inv.id}
            className="p-4 border rounded cursor-pointer hover:shadow"
            onClick={() => navigate(`/inventory/${inv.id}`)}
          >
            <h3 className="font-semibold">{inv.name}</h3>
            <p>{inv.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InventoryList
