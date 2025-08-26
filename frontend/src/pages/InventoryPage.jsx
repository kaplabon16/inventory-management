import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { getInventoryDetails } from "../api/inventory"
import InventoryList from "../components/Inventory/InventoryList"
import InventorySettings from "../components/Inventory/InventorySettings"
import CustomIDBuilder from "../components/Inventory/CustomIDBuilder"
import DiscussionBoard from "../components/Discussion/DiscussionBoard"
import { AuthContext } from "../context/AuthContext"

const InventoryPage = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [inventory, setInventory] = useState(null)

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await getInventoryDetails(id)
        setInventory(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInventory()
  }, [id])

  if (!inventory) return <p className="p-4">Loading inventory...</p>

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">{inventory.name}</h2>
      <InventorySettings inventory={inventory} setInventory={setInventory} />
      <CustomIDBuilder inventory={inventory} setInventory={setInventory} />
      <InventoryList items={inventory.items} />
      <DiscussionBoard inventoryId={id} currentUser={user} />
    </div>
  )
}

export default InventoryPage
