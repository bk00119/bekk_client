"use server"

import FeedCard from "../../feed/Card"

export default async function UserFeed({ user_id, username }) {
  async function getFeed() {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/view/posts/${user_id}`,
      {
        method: "GET",
      }
    )

    if (res.status == 200) {
      const data = await res.json()
      return data
    }
    return null
  }

  let feed
  if (user_id) {
    feed = await getFeed()
  }

  return (
    <div className="w-full mt-8">
      <h1 className="text-xl font-semibold mb-4 ml-1">Feed</h1>
      {feed &&
        Object.entries(feed).map(([key, value]) => (
          <div key={key}>
            <FeedCard
              post_id={key}
              post_data={value}
              username={username}
              user_id={user_id}
            />
          </div>
        ))}
    </div>
  )
}
