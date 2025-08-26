import React, { useEffect, useState, useContext } from "react"
import { getUserDetails } from "../../api/user"
import { AuthContext } from "../../context/AuthContext"
import { useParams, Link } from "react-router-dom"

const UserProfile = () => {
  const { userId } = useParams()
  const { user } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserDetails(userId)
        setProfile(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProfile()
  }, [userId])

  if (!profile) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">{profile.username}'s Profile</h2>
      <p className="mb-2">Email: {profile.email}</p>
      <p className="mb-4">Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>

      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Owned Inventories</h3>
        {profile.ownedInventories.length === 0 ? (
          <p>No inventories owned.</p>
        ) : (
          <ul className="ml-5 list-disc">
            {profile.ownedInventories.map(inv => (
              <li key={inv.id}>
                <Link to={`/inventory/${inv.id}`} className="text-blue-500 hover:underline">{inv.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Writable Inventories</h3>
        {profile.writeInventories.length === 0 ? (
          <p>No writable inventories.</p>
        ) : (
          <ul className="ml-5 list-disc">
            {profile.writeInventories.map(inv => (
              <li key={inv.id}>
                <Link to={`/inventory/${inv.id}`} className="text-blue-500 hover:underline">{inv.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserProfile
