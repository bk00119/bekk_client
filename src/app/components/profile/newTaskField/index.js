"use client"

import Select from "react-select"
import { useId, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function NewTaskField({ user_id, goals }) {
  const router = useRouter()
  const ref = useRef()

  const selectRef = useRef(null)
  const inputRef = useRef(null)

  const [task, setTask] = useState("")
  const [goal, setGoal] = useState("")

  const goal_options = goals
    ? Object.entries(goals).map(([key, val]) => ({
        label: val.content,
        value: key,
      }))
    : []

  function handleAddTask() {
    try {
      if (task.length === 0) {
        return alert("Please enter a task name")
      }

      if (goal.length === 0) {
        return alert("Please select a goal")
      }
      handleCreateTask()
    } catch (error) {
      console.error("Error adding task", error)
    }
  }

  async function handleCreateTask() {
    try {
      const res = await fetch("/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //hypothetical fields in collection
          user_id: user_id,
          goal_id: goal,
          is_completed: false,
          content: task,
        }),
      })
      if (res.ok) {
        setGoal("")
        setTask("")
        selectRef.current.setValue("")
        router.refresh()
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.log("error creating task: ", error)
    }
  }

  return (
    <div className="w-full mt-4">
      <p className="font-semibold mb-2">Add Task:</p>
      {/* INPUT TASK NAME */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task name"
        className="w-full border rounded-md p-2 mb-2"
      />

      {/* SELECT GOALS */}
      {/* Warning: Extra attributes from the server: aria-activedescendant */}
      <Select
        placeholder="Select a goal"
        ref={selectRef}
        options={goal_options}
        instanceId={useId()}
        onChange={(option) => setGoal(option.value)}
        className="w-full mb-2"
      />

      <button
        onClick={handleAddTask}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </div>
  )
}
