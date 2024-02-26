export default function FeedCard({ task_id, task_data }) {
  // CHANGE TO Post data, not Task

  return (
    <div className="w-auto bg-white drop-shadow mb-8 p-4">
      <div className="mb-2">
        <p>USERNAME: NEED TO FETCH USER DATA</p>
      </div>
      <div className="mb-2">
        <p className="text-lg font-medium">What I did today:</p>
        <p>{task_data.content}</p>
      </div>
      <p>likes: {task_data.likes.length}</p>
    </div>
  )
}
