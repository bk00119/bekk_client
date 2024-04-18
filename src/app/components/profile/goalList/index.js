// goals: user's goals (all: incomplete + completed)
export default function GoalList({ goals }) {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-semibold">Goals:</h2>
      {/* DISPLAY USER'S GOALS & Attached Tasks*/}
      <ul className="list-inside list-disc">
        {goals &&
          Object.entries(goals).map(([key, val]) => (
            <li key={key}>
              {/* GOAL NAME */}
              <span>{val.content}</span>

              {/* LIST OF TASKS */}
              <div className="ml-6">
                <p className="underline">Tasks</p>
                <ul className="list-inside list-[circle]">
                  {val.tasks.map((task) => (
                    <li key={task._id}>{task.content}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
      </ul>

      {/* 1) CURRENT (INCOMPLETE) */}

      {/* 2) PAST (COMPLETED) */}

      {/* MARK GOALS COMPLETE/INCOMPLETE */}
    </div>
  )
}
