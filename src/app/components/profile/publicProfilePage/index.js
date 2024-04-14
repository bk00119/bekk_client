"use client"

import { useState, useEffect } from "react"

export default function PublicProfilePage({ profile_id, children }) {
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      getUserData()
    }
  }, [])

  async function getUserData() {
    const res = await fetch("/api/profile/getUserData", {
      method: "POST",
      body: JSON.stringify({
        _id: profile_id,
      }),
    })
    const data = await res.json()
    if (res.status == 200) {
      setUserData(data)
    }
    setLoading(false)
  }

  if (isLoading) return <div className="w-full">Loading...</div>

  if (!userData) return <div className="w-full">No profile data</div>

  return (
    <div className="w-full">
      {children}

      {/* Profile Section */}
      <h2 className="mb-4 text-lg font-semibold">Profile:</h2>
      <div>profile: {userData?.username}</div>
      <div>
        name: {userData?.first_name} {userData?.last_name}
      </div>
    </div>
  )
}
