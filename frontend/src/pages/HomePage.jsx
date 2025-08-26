import React, { useEffect, useState } from "react"
import { getInventories } from "../api/inventory"
import Table from "../components/UI/Table"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [inventories, setInventories] = useState([])

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

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Creator", accessor: "creatorUsername" },
    { header: "Items", accessor: "itemCount" }
  ]

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">All Inventories</h2>
      <Table
        columns={columns}
        data={inventories.map(inv => ({
          id: inv.id,
          name: <Link to={`/inventory/${inv.id}`} className="text-blue-500 hover:underline">{inv.name}</Link>,
          creatorUsername: inv.creator.username,
          itemCount: inv.items.length
        }))}
      />
    </div>
  )
}

export default HomePage
