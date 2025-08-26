import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getItemDetails } from "../api/item"
import ItemDetails from "../components/Item/ItemDetails"

const ItemPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getItemDetails(id)
        setItem(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchItem()
  }, [id])

  if (!item) return <p className="p-4">Loading item...</p>

  return <ItemDetails item={item} />
}

export default ItemPage
