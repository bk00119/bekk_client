import FeedCard from "./components/feed/Card"

// SERVER SIDE FUNCTION -> NOT VISIBLE ON CLIENT SIDE
async function getData() {
  const res = await fetch("https://bk00119.pythonanywhere.com/viewTasks", {
    method: "GET",
  })
  // if (!res.ok) {
  //   throw new Error("Failed to fetch data")
  // }

  return res.json()
}

export default async function Home() {
  const data = await getData()
  return (
    <div className="w-full">
      <h1 className="text-2xl mb-8">Feed</h1>
      {Object.entries(data.Tasks).map(([key, value]) => (
        <div key={key}>
          <FeedCard task_id={key} task_data={value} />
        </div>
      ))}
    </div>
  )
}
