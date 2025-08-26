import React from "react"

const Toolbar = ({ children }) => {
  return (
    <div className="flex items-center justify-between p-2 mb-4 bg-gray-100 rounded">
      {children}
    </div>
  )
}

export default Toolbar
