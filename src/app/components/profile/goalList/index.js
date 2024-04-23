import TaskList from "../taskList"

// goals: user's goals (all: incomplete + completed)
export default function GoalList({ goals }) {
  const completed_goals = []
  const incomplete_goals = []

  // SPLIT UP BY is_completed
  Object.entries(goals).forEach(([goal_id, goal_content]) => {
    const completed_tasks = []
    const incomplete_tasks = []
    goal_content.tasks.forEach((task) => {
      if (task.is_completed) {
        completed_tasks.push(task)
      } else {
        incomplete_tasks.push(task)
      }
    })

    goal_content.completed_tasks = completed_tasks
    goal_content.incomplete_tasks = incomplete_tasks
    // delete goal_content.task_ids
    delete goal_content.tasks

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
      <div className="list-inside list-disc">
        {goals &&
          Object.entries(goals).map(([key, val]) => (
            <div key={key} className="mt-2">
              {/* GOAL NAME */}
              <p className="font-medium">{val.content}</p>

              {/* LIST OF COMPLETED TASKS */}
              <div className="ml-4">
                {val.task_ids.length > 0 ? (
                  <>
                    <TaskList
                      tasks={val.incomplete_tasks}
                      is_completed={false}
                    />
                    <TaskList tasks={val.completed_tasks} is_completed={true} />
                  </>
                ) : (
                  <div>No tasks added yet</div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* 1) CURRENT (INCOMPLETE) */}

      {/* 2) PAST (COMPLETED) */}

      {/* MARK GOALS COMPLETE/INCOMPLETE */}
    </div>
  )
}
