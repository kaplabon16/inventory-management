import React, { useEffect, useState } from "react"
import { getUsers } from "../api/user"
import Table from "../components/UI/Table"

const AdminPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers()
        setUsers(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUsers()
  }, [])

  const columns = [
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Joined", accessor: "createdAt" }
  ]

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Admin Panel - Users</h2>
      <Table
        columns={columns}
        data={users.map(u => ({
          id: u.id,
          username: u.username,
          email: u.email,
          createdAt: new Date(u.createdAt).toLocaleDateString()
        }))}
      />
    </div>
  )
}

export default AdminPage
