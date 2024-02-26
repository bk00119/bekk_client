import ErrorMessage from "./components/errorMessage"
import FeedCard from "./components/feed/Card"

// SERVER SIDE FUNCTION -> NOT VISIBLE ON CLIENT SIDE
async function getFeed() {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/viewTasks`, {
    method: "GET",
  })

  return res.json()
}

export default async function Home() {
  const feed = await getFeed()

  return (
    <div className="w-full">
      <h1 className="text-2xl mb-8">Feed</h1>
      {feed.Tasks ? (
        Object.entries(feed.Tasks).map(([key, value]) => (
          <div key={key}>
            <FeedCard task_id={key} task_data={value} />
          </div>
        ))
      ) : (
        <ErrorMessage message="Error: failed loading feed" />
      )}
    </div>
  )
}
