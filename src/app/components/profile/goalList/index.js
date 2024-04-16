// goals: user's goals (all: incomplete + completed)
export default function GoalList({ goals }) {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-semibold">Goals:</h2>
      {/* DISPLAY USER'S GOALS & Attached Tasks*/}
      <ul className="list-inside list-disc">
      {Object.entries(goals).map(([key, val]) => (
        <li key={key}>
          {/* GOAL NAME */}
          <span>{val.content}</span>

          {/* LIST OF TASKS */}
          <p>Tasks</p>
          <ul>
            {val.tasks.map((task) => (
              <li key={task._id}>{task.content}</li>
            ))}
          </ul>
        </li>
      ))}
      </ul>

      {/* 1) CURRENT (INCOMPLETE) */}

      {/* 2) PAST (COMPLETED) */}

      {/* MARK GOALS COMPLETE/INCOMPLETE */}
    </div>
  )
}
