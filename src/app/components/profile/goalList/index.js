// goals: user's goals (all: incomplete + completed)
export default function GoalList({ goals }) {
  const completed_goals = []
  const incomplete_goals = []
  
  // SPLIT UP BY is_completed 
  Object.entries(goals).forEach(([goal_id, goal_content]) => {
    if (goal_content.is_completed) {
      goal_content._id = goal_id
      completed_goals.push(goal_content)
    } else {
      goal_content._id = goal_id
      incomplete_goals.push(goal_content)
    }
  })

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
