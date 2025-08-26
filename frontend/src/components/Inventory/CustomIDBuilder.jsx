import React, { useEffect, useState } from "react"
import { getCustomIDs, createCustomID, deleteCustomID } from "../../api/inventory"
import { useParams } from "react-router-dom"

const CustomIDBuilder = () => {
  const { id } = useParams()
  const [ids, setIds] = useState([])
  const [newID, setNewID] = useState("")

  useEffect(() => {
    const fetchIDs = async () => {
      try {
        const res = await getCustomIDs(id)
        setIds(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchIDs()
  }, [id])

  const addID = async () => {
    if (!newID) return
    try {
      const res = await createCustomID(id, { elementValue: newID })
      setIds([...ids, res.data])
      setNewID("")
    } catch (err) {
      console.error(err)
    }
  }

  const removeID = async (cid) => {
    try {
      await deleteCustomID(id, cid)
      setIds(ids.filter(i => i.id !== cid))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-md p-4">
      <h2 className="mb-4 text-xl font-bold">Custom IDs</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newID}
          onChange={(e) => setNewID(e.target.value)}
          placeholder="New ID"
          className="flex-1 p-2 border rounded"
        />
        <button onClick={addID} className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add</button>
      </div>
      <ul>
        {ids.map(c => (
          <li key={c.id} className="flex items-center justify-between p-2 mb-1 border rounded">
            {c.elementValue}
            <button onClick={() => removeID(c.id)} className="text-red-500 hover:text-red-700">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomIDBuilder
