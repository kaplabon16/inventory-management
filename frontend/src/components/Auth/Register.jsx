import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(username, email, password)
      navigate("/home")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="max-w-md p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" required />
        <button type="submit" className="p-2 text-white bg-green-500 rounded hover:bg-green-600">Register</button>
      </form>
    </div>
  )
}

export default Register
