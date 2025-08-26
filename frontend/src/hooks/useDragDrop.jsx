import { useState } from "react"

const useDragDrop = (initialItems = []) => {
  const [items, setItems] = useState(initialItems)

  const handleDrag = (dragIndex, hoverIndex) => {
    const updated = [...items]
    const [removed] = updated.splice(dragIndex, 1)
    updated.splice(hoverIndex, 0, removed)
    setItems(updated)
  }

  return [items, setItems, handleDrag]
}

export default useDragDrop
