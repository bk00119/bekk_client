"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { MdEdit, MdDelete  } from "react-icons/md";

export default function TaskBox({ task, goal_id }) {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(task.is_completed)
  const [isInputType, setIsInputType] = useState(false)
  const [taskContent, setTaskContent] = useState(task.content)

  async function setTaskChanged() {
    // UPDATE is_changed OF THE TASK
    const updated_task = {
      _id: task._id,
      goal_id: goal_id,
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
      goal_id: goal_id,
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
        throw new Error("Failed to update task")
      }
    } catch (error) {
      console.log("error updating is_completed of task: ", error)
    }
  }

  async function deleteTask(){
    const task_data = {
      _id: task._id,
      goal_id: goal_id,
      user_id: task.user_id
    }

    try {
      const res = await fetch("/api/task/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task_data),
      })
      if (res.ok) {
        // setIsInputType(false)
        // task.content = taskContent
        router.refresh()
      } else {
        throw new Error("Failed to delete task")
      }
    } catch (error) {
      console.log("error deleting task: ", error)
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

          {/* UPDATE BUTTON */}
          <button
            className="text-xl ml-2 text-gray-500"
            onClick={() => setIsInputType(true)}
          >
            {/* Update */}
            <MdEdit />
          </button>

          {/* DELETE BUTTON */}
          <button
            className="text-xl ml-2 text-gray-500"
            onClick={deleteTask}
          >
            {/* Update */}
            <MdDelete />
          </button>
        </>
      )}
    </div>
  )
}
