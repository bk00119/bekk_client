"use client"

import TaskList from "../taskList"

export default function GoalList({ goals }) {
  return Object.entries(goals).map(([key, val]) => (
    <div key={key} className="mt-2">
      {/* GOAL NAME */}
      <p className="font-medium">{val.content}</p>

      {/* LIST OF COMPLETED TASKS */}
      <div className="ml-4">
        {val.task_ids.length > 0 ? (
          <>
            <TaskList goal_id={val._id} tasks={val.incomplete_tasks} is_completed={false} />
            <TaskList goal_id={val._id} tasks={val.completed_tasks} is_completed={true} />
          </>
        ) : (
          <div>No tasks added yet</div>
        )}
      </div>
    </div>
  ))
}
