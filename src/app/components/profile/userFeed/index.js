'use server'

import FeedCard from "../../feed/Card"

export default async function UserFeed({ user_id, username }) {
  async function getFeed() {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/view/posts/${user_id}`, {
      method: "GET",
    })

    if (res.status == 200){
      const data = await res.json()
      return data
    }
    return null
  }

  let feed
  if(user_id){
    feed = await getFeed()
  }

  return (
    <div className="w-full">
      <h1>Feed</h1>
      {feed && (
        Object.entries(feed).map(([key, value]) => (
          <div key={key}>
            {/* MODIFY THIS AFTER MERGING KAITLYN'S WORK */}
            <FeedCard post_id={key} post_data={value} username={username} />
          </div>
        ))
      )}
    </div>
  )
}
