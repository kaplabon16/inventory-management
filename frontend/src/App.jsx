import React, { useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import InventoryPage from "./pages/InventoryPage"
import ItemPage from "./pages/ItemPage"
import UserPage from "./pages/UserPage"
import AdminPage from "./pages/AdminPage"
import { AuthContext } from "./context/AuthContext"

const App = () => {
  const { user } = useContext(AuthContext)

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />
  }

  const AdminRoute = ({ children }) => {
    return user && user.role === "admin" ? children : <Navigate to="/" />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory/:id" element={<PrivateRoute><InventoryPage /></PrivateRoute>} />
        <Route path="/item/:id" element={<PrivateRoute><ItemPage /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute><UserPage /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        {/* Optional: add login/register pages */}
        <Route path="*" element={<h2 className="p-4">Page not found</h2>} />
      </Routes>
    </Router>
  )
}

export default App
