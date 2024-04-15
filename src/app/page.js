import { cookies } from "next/headers"

import { verifyToken } from "@/utils/jwt"
import ErrorMessage from "./components/errorMessage"
import FeedCard from "./components/feed/Card"

async function getFeed() {
  const cookieStore = cookies()
  const access_token = cookieStore.get("access_token")
  const access_token_data = await verifyToken(access_token.value)

  // CURRENT USER'S ID
  const curr_user_id = access_token_data?.user_id

  if(!curr_user_id) return console.log("Error: failed loading feed bc user_id ")

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/view/posts/all`, {
    method: "GET",
  })

  if (res.status == 200){
    return res.json()
  }

  return null
}

export default async function Home() {
  const feed = await getFeed();

  if (feed && Object.keys(feed).length > 0) {
    return (
      <div className="w-full">
        <h1 className="text-2xl mb-8">Feed</h1>
        {Object.entries(feed).map(([key, value]) => (
          <div key={key}>
            <FeedCard post_id={key} post_data={value} />
          </div>
        ))}
      </div>
    );
  } else {
    return <ErrorMessage message="Error: failed loading feed" />;
  }
}
