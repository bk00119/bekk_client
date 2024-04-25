"use client"

import { useRef, useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"

import GoalSelect from "../../goalSelect"

export default function NewPostField({ createPost, goals, setIsAddingPost }) {
  const selectRef = useRef(null)
  const [postContent, setPostContent] = useState("")
  const [selectedGoals, setSelectedGoals] = useState([null])
  const [selectedTasks, setSelectedTasks] = useState([null])

  function resetField() {
    setPostContent("")
    setSelectedGoals([null])
    setSelectedTasks([null])
  }

  function handleSubmitPost() {
    // CHECK IF THE CONTENT IS BLANK
    if (postContent.length == 0) {
      return alert("Please write a content")
    }
    // CHEKC IF NO GOAL IS SELECTED
    if (selectedGoals.length == 0) {
      return alert("Please include at least one goal")
    }
    // CHECK IF A GOAL IS EMPTY(NULL)
    if (checkNullInArray(selectedGoals)) {
      return alert("Please select a goal")
    }
    // CHECK IF NO TASK IS SELECTED
    if (selectedTasks.length == 0) {
      return "Please include at least one task"
    }
    // CHECK IF A TASK IS EMPTY(NULL)
    if (checkNullInArray(selectedTasks)) {
      return alert("Please select a task")
    }

    // createPost(postContent) -> TO CALL API

    // REMOVE THIS
    console.log(postContent)
    console.log(selectedGoals)
    console.log(selectedTasks)

    resetField()
  }

  function checkNullInArray(arr) {
    arr.forEach((elem) => {
      return elem === null || elem === ""
    })
    return false
  }

  // ADD A NEW GOAL WITH NULL VAL TO SELECTEDGOALS
  function addGoal() {
    setSelectedGoals([...selectedGoals, null])
  }

  function removeGoal() {
    // REMOVE A GOAL FROM SELECTED GOALS
    // + REMOVE THE SELECTED TASKS AS WELL -> CALL REMOVETASK()
  }

  function addTask() {
    // ADD A NEW TASK WITH NULL VAL TO SELECTEDTASKS
  }

  function removeTask() {
    // REMOVE A TASK FROM SELECTED TASKS
  }

  function setGoal(goal_id, index) {
    const updated_goals = selectedGoals.map((goal, i) => {
      if (index === i) {
        return goal_id
      } else {
        return goal
      }
    })

    setSelectedGoals(updated_goals)
  }

  return (
    <div className="w-full flex flex-col">
      {/* CONTENT */}
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        className="w-full border rounded-md p-2 mb-4"
      />

      {/* GOAL SELECTION */}
      {selectedGoals.map((goal, index) => (
        <div>
          <p className="mb-1">Goal {index + 1}</p>
          <GoalSelect
            key={index}
            goals={goals}
            selectRef={selectRef}
            setGoal={setGoal}
            index={index}
          />
        </div>
      ))}

      {/* TASK(S) SELECTION */}

      {/* ADD TASK BUTTON */}

      {/* ADD GOAL BUTTON */}
      <button
        className="w-fit mb-4 flex items-center bg-gray-400 hover:bg-gray-500 rounded py-1 px-2 text-sm text-white"
        onClick={addGoal}
      >
        <MdAdd className="mr-1" />
        Add goal
      </button>

      <div className="flex">
        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmitPost}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Post
        </button>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsAddingPost(false)}
          className="size-fit p-3 ml-2 bg-gray-200 rounded"
        >
          <MdClose />
        </button>
      </div>
    </div>
  )
}
