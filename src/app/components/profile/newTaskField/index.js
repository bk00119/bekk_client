"use client"

import Select from "react-select"
import { useId, useState } from 'react';

export default function NewTaskField({ goals }) {
  const [goal, setGoal] = useState(null)

  const goalOptions = Object.entries(goals).map(([key, val]) => ({
    label: val.content,
    value: key,
  }))

  function handleAddTask(event) {
    try {
      console.log("here")
      console.log(goal)
      const taskContent = event.target.textContent

      //FIX THIS!!
      // handleCreateTask(taskContent)
    } catch (error) {
      console.error("Error adding task", error)
    }
  }

  async function handleCreateTask(taskContent) {
    try {
      const res = await fetch("/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //hypothetical fields in collection
          user_id: profile_id,
          goal_id: "123456",
          is_completed: false,
          content: taskContent,
        }),
      })
      if (!res.ok) {
        throw new Error("Failed to create task")
      }
      console.log(await res.json())
      console.log("Task created")
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
        //alue={newTask}
        //onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task name"
        className="w-full border rounded-md p-2 mb-2"
      />

      {/* SELECT GOALS */}
      <Select 
        // options={goals}
        options={goalOptions}
        instanceId={useId()}
        required={true}
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
