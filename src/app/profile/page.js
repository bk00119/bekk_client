"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

import NewPostField from "../components/profile/newPostField"
import NewTaskField from "../components/profile/newTaskField"
import TaskList from "../components/profile/taskList"

function ProfilePageInner() {
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

  return (
    <div className="w-full">
      {/* Profile Section */}
      <h2 className="mb-4 text-lg font-semibold">Your Profile:</h2>
      <div>profile: {userData?.username}</div>
      <div>
        name: {userData?.first_name} {userData?.last_name}
      </div>

      <div className="flex justify-between">
        {/* LEFT COLUMN */}
        {/* POST SECTION */}
        <div className="w-full">
          <NewPostField user_id={profile_id} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-1/4">
          {/* Tasks Section */}
          <div className="w-full p-4 border rounded">
            <TaskList />
            <NewTaskField />
          </div>

          {/* GOAL SECTION */}
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    // useSearchParams() needs to be wrapped in a Suspense boundary.
    <Suspense>
      <ProfilePageInner />
    </Suspense>
  )
}
