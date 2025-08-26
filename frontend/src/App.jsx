import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import HomePage from './pages/HomePage'
import InventoryPage from './pages/InventoryPage'
import ItemPage from './pages/ItemPage'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/inventory/:id" element={<InventoryPage />} />
              <Route path="/item/:id" element={<ItemPage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
