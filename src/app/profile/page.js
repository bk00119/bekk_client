"use client"

import { useSearchParams } from "next/navigation"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const profile_id = searchParams.get("id")

  return <div className="w-full">profile: {profile_id}</div>
}
