import TaskBox from "../taskBox"

export default function TaskList({ tasks, is_completed }) {
  if (tasks.length > 0) {
    return (
      <div className="mt-2">
        <p className="underline">
          {is_completed ? "Completed tasks" : "Incomplete tasks"}
        </p>
        <div className="list-inside list-[circle]">
          {tasks.map((task) => (
            <div key={task._id}>
              <TaskBox task={task} task_id={task._id} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}
