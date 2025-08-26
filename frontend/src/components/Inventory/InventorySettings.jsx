import React, { useState, useEffect } from "react"
import { getInventory, updateInventory } from "../../api/inventory"
import { useParams } from "react-router-dom"
import { useAutosave } from "../../hooks/useAutosave"

const InventorySettings = () => {
  const { id } = useParams()
  const [inventory, setInventory] = useState({ name: "", description: "" })
  const [status, setStatus] = useState("")

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await getInventory(id)
        setInventory(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInventory()
  }, [id])

  const saveInventory = async () => {
    try {
      await updateInventory(id, inventory)
      setStatus("Saved!")
      setTimeout(() => setStatus(""), 2000)
    } catch (err) {
      console.error(err)
      setStatus("Failed to save")
    }
  }

  useAutosave(saveInventory, 7000, [inventory])

  return (
    <div className="max-w-md p-4">
      <h2 className="mb-4 text-xl font-bold">Inventory Settings</h2>
      {status && <p className="mb-2 text-green-500">{status}</p>}
      <input
        type="text"
        value={inventory.name}
        onChange={(e) => setInventory({ ...inventory, name: e.target.value })}
        placeholder="Inventory Name"
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        value={inventory.description}
        onChange={(e) => setInventory({ ...inventory, description: e.target.value })}
        placeholder="Inventory Description"
        className="w-full p-2 mb-2 border rounded"
      />
    </div>
  )
}

export default InventorySettings
