export default function TaskList({ tasks, is_completed }) {
  if (tasks.length > 0) {
    return (
      <div className="mt-1">
        <p className="underline">
          {is_completed ? "Completed tasks" : "Incomplete tasks"}
        </p>
        <div className="list-inside list-[circle]">
          {tasks.map((task) => (
            <p key={task._id}>{task.content}</p>
          ))}
        </div>
      </div>
    )
  }
}
