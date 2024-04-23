import UserFeed from "../userFeed"

// SERVER SIDE FUNCTION -> NOT VISIBLE ON CLIENT SIDE
async function getUserData(profile_id) {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/view/user/public`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: profile_id,
      }),
    }
  )
  const status = res.status
  const data = await res.json()
  if (status == 200) {
    return data
  }
  return null
}

export default async function PublicProfilePage({ profile_id, children }) {
  const userData = await getUserData(profile_id)

  return userData ? (
    <div className="w-full">
      {children}

      {/* Profile Section */}
      <h2 className="mb-4 text-lg font-semibold">Profile:</h2>
      <div>profile: {userData?.username}</div>
      <div>
        name: {userData?.first_name} {userData?.last_name}
      </div>

      {/* FEED */}
      <UserFeed user_id={profile_id} username={userData.username} />
    </div>
  ) : (
    <div className="w-full">No profile data</div>
  )
}
