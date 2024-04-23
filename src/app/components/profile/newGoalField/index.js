"use client"

import { useId, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function NewGoalField({ user_id }) {
  const router = useRouter()
  const ref = useRef()

  const inputRef = useRef(null)

  const [goal, setGoal] = useState("")

  function handleAddGoal() {
    try {
      if (goal.length === 0) {
        return alert("Please enter a goal name")
      }
      handleCreateGoal()
    } catch (error) {
      console.error("Error adding goal", error)
    }
  }

  async function handleCreateGoal() {
    try {
      const res = await fetch("/api/goal/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //hypothetical fields in collection
          user_id: user_id,
          content: goal,
          is_completed: false,
        }),
      })
      if (res.ok) {
        setGoal("")
        inputRef.current.value = ""
        router.refresh()
      } else {
        throw new Error("Failed to create goal")
      }
    } catch (error) {
      console.log("error creating goal: ", error)
    }
  }

  return (
    <div className="w-full mt-4">
      <p className="font-semibold mb-2">Add Goal:</p>
      {/* INPUT GOAL NAME */}
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter a goal name"
        className="w-full border rounded-md p-2 mb-2"
      />

      <button
        onClick={handleAddGoal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Add Goal
      </button>
    </div>
  )
}
