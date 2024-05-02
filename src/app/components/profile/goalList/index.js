"use client"

import { MdEdit, MdDelete } from "react-icons/md"
import { useRouter } from "next/navigation"

import TaskList from "../taskList"

export default function GoalList({ goals }) {
  const router = useRouter()

  async function deleteGoal(goal_id){
    try {
      const res = await fetch("/api/goal/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: goal_id
        }),
      })
      if (res.ok) {
        router.refresh()
      } else {
        throw new Error("Failed to delete task")
      }
    } catch (error) {
      console.log("error deleting task: ", error)
    }
  }

  return Object.entries(goals).map(([key, val]) => (
    <div key={key} className="mt-2">
      {/* GOAL NAME */}
      <div className="flex">
        <p className="font-medium">{val.content}</p>
        {/* DELETE BUTTON */}
        <button className="text-xl ml-4 text-gray-500 hover:bg-red-600" onClick={()=>deleteGoal(val._id)}>
          <MdDelete />
        </button>
      </div>

      {/* LIST OF COMPLETED TASKS */}
      <div className="ml-4">
        {val.task_ids.length > 0 ? (
          <>
            <TaskList
              goal_id={val._id}
              tasks={val.incomplete_tasks}
              is_completed={false}
            />
            <TaskList
              goal_id={val._id}
              tasks={val.completed_tasks}
              is_completed={true}
            />
          </>
        ) : (
          <div>No tasks added yet</div>
        )}
      </div>
    </div>
  ))
}
