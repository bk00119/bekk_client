import { cookies } from "next/headers"

import NewPostContainer from "../newPostContainer"
import NewTaskField from "../newTaskField"
import NewGoalField from "../newGoalField"
import UserFeed from "../userFeed"
import GoalsContainer from "../goalsContainer"

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

async function getUserGoals(profile_id) {
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/view/user/goals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: profile_id,
        access_token: cookies().get("access_token").value,
        refresh_token: cookies().get("refresh_token").value,
      }),
    }
  )
  const status = res.status
  const data = await res.json()
  if (status == 200) {
    return data.Goals
  }
  return null
}

export default async function PrivateProfilePage({ profile_id, children }) {
  const userData = await getUserData(profile_id)
  let userGoals = await getUserGoals(profile_id)
  if (!userGoals) {
    userGoals = []
  }

  return userData ? (
    <div className="w-full">
      {/* MODIFY THIS */}
      {/* {children} */}

      {/* Profile Section */}
      <h1 className="text-2xl font-semibold mb-8">
        {userData?.username}{" "}
        <span className="font-normal">
          ({userData?.first_name} {userData?.last_name})
        </span>
      </h1>

      <div className="flex justify-between">
        {/* LEFT COLUMN */}
        {/* POST SECTION */}
        <div className="w-full">
          <NewPostContainer user_id={profile_id} goals={userGoals} />
          <UserFeed user_id={profile_id} username={userData.username} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-1/2 ml-4">
          {/* Tasks Section */}
          <div className="w-full p-4 border rounded">
            <NewTaskField user_id={profile_id} goals={userGoals} />
          </div>

          {/* GOAL SECTION */}
          <div className="w-full p-4 border rounded mt-4">
            <GoalsContainer goals={userGoals} />
            {/* ADD NewGoalField */}
            <NewGoalField user_id={profile_id} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full">No profile data</div>
  )
}
