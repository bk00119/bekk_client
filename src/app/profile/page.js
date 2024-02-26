"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const profile_id = searchParams.get("id")
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
    setUserData(await res.json())
    setLoading(false)
  }

  if (isLoading) return <div className="w-full">Loading...</div>

  if (!userData) return <div className="w-full">No profile data</div>

  return <div className="w-full">profile: {userData.username}</div>
}
