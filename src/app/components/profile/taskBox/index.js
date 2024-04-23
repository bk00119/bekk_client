"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TaskBox({ task, key }) {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(task.is_completed)

  async function setTaskChanged() {
    // UPDATE is_changed OF THE TASK
    const updated_task = {
      _id: task._id,
      user_id: task.user_id,
      is_completed: !isCompleted,
    }

    try {
      const res = await fetch("/api/task/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated_task),
      })
      if (res.ok) {
        setIsCompleted(!isCompleted)
        router.refresh()
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.log("error updating is_completed of task: ", error)
    }
  }

  return (
    <div className="flex">
      {task.is_completed ? (
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={setTaskChanged}
        />
      ) : (
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={setTaskChanged}
        />
      )}
      <p className="ml-2" key={task._id}>
        {task.content}
      </p>
    </div>
  )
}
