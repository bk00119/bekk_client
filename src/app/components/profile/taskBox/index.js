"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TaskBox({ task, key }) {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(task.is_completed)
  const [isInputType, setIsInputType] = useState(false)
  const [taskContent, setTaskContent] = useState(task.content)

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

  function resetInput() {
    setTaskContent(task.content)
    setIsInputType(false)
  }

  async function updateTaskContent() {
    const updated_task = {
      _id: task._id,
      user_id: task.user_id,
      content: taskContent,
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
        setIsInputType(false)
        task.content = taskContent
        router.refresh()
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.log("error updating is_completed of task: ", error)
    }
  }

  return (
    <div className="flex items-start w-full justify-between mt-2">
      {isInputType ? (
        <>
          <input
            type="text"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            placeholder="Update a task name"
            className="w-full text-sm border rounded-md p-1 mb-1"
          />
          <div className="ml-1 flex">
            <button
              className="text-sm bg-blue-500 text-white p-1 rounded"
              onClick={updateTaskContent}
            >
              Update
            </button>
            <button className="text-sm ml-1 underline" onClick={resetInput}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex items-baseline">
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
            <p className="ml-2">{task.content}</p>
          </div>
          <button
            className="text-sm underline text-blue-500"
            onClick={() => setIsInputType(true)}
          >
            Update
          </button>
        </>
      )}
    </div>
  )
}
