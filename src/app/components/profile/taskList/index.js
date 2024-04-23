import TaskBox from "../taskBox";

export default function TaskList({ tasks, is_completed }) {
  if (tasks.length > 0) {
    return (
      <div className="mt-1">
        <p className="underline">
          {is_completed ? "Completed tasks" : "Incomplete tasks"}
        </p>
        <div className="list-inside list-[circle]">
          {tasks.map((task) => (
            <TaskBox task={task} key={task._id} />
          ))}
        </div>
      </div>
    )
  }
}
