"use client"

import { useState } from "react"
import GoalList from "../goalList"

// goals: user's goals (all: incomplete + completed)
export default function GoalsContainer({ goals }) {
  const completed_goals = []
  const incomplete_goals = []
  const [incompleteTabSelected, setIncompleteTabSelected] = useState(true)

  // SPLIT UP BY is_completed
  if (goals) {
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
      // delete goal_content.tasks

      if (goal_content.is_completed) {
        goal_content._id = goal_id
        completed_goals.push(goal_content)
      } else {
        goal_content._id = goal_id
        incomplete_goals.push(goal_content)
      }
    })
  }

  const selectedTabStyles = "text-blue-500 border-b-2 border-blue-500"

  return (
    <div className="w-full">
      <h2 className="mb-1 text-lg font-semibold">Goals:</h2>

      {/* TABS (COMPLETED/INCOMPLETE GOALS) */}
      <div className="flex w-full mb-4">
        <button
          className={" " + (incompleteTabSelected && selectedTabStyles)}
          onClick={() => setIncompleteTabSelected(true)}
        >
          Incomplete
        </button>
        <button
          className={"ml-2 " + (!incompleteTabSelected && selectedTabStyles)}
          onClick={() => setIncompleteTabSelected(false)}
        >
          Completed
        </button>
      </div>

      {/* DISPLAY USER'S GOALS & Attached Tasks*/}
      {/* <div className="list-inside list-disc">
        {goals && <GoalList goals={goals} />}
      </div> */}

      {incompleteTabSelected ? (
        <div className="list-inside list-disc">
          {/* 1) CURRENT (INCOMPLETE) */}
          {incomplete_goals && incomplete_goals.length > 0 ? <GoalList goals={incomplete_goals} /> : <p>No goals</p>}
        </div>
      ) : (
        <div className="list-inside list-disc">
          {/* 2) PAST (COMPLETED) */}
          {completed_goals && completed_goals.length > 0 ? <GoalList goals={completed_goals} /> : <p>No goals</p>}
        </div>
      )}

      {/* MARK GOALS COMPLETE/INCOMPLETE */}
    </div>
  )
}
