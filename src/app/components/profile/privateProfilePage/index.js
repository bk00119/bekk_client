import NewPostField from "../newPostField"
import NewTaskField from "../newTaskField"
import TaskList from "../taskList"
import UserFeed from "../userFeed"

// SERVER SIDE FUNCTION -> NOT VISIBLE ON CLIENT SIDE
async function getUserData(profile_id) {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/view/User/Public`,
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

export default async function PrivateProfilePage({ profile_id, children }) {
  const userData = await getUserData(profile_id)

  return userData ? (
    <div className="w-full">
      {/* MODIFY THIS */}
      {children}

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
          <UserFeed user_id={profile_id} username={userData.username} />
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
  ) : (
    <div className="w-full">No profile data</div>
  )
}
