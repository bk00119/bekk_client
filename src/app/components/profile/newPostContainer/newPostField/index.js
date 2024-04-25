"use client"

import { useRef, useState } from "react"
import GoalSelect from "../../goalSelect"

export default function NewPostField({ createPost, goals }) {
  const selectRef = useRef(null)
  const [postContent, setPostContent] = useState("")
  const [selectedGoals, setSelectedGoals] = useState([])
  const [selectedTasks, setSelectedTasks] = useState([])

  function handleSubmitPost(){
    if (postContent.length == 0){
      return alert("Please write a content")
    }
    if(selectedGoals.length == 0){
      // ++ CHECK IF SELECTED GOALS INCLUDE NULL VAL
      return alert("Please include at least one goal")
    }

    if(selectedTasks.length == 0){
      // ++ CHECK IF SELECTED TASKS INCLUDE NULL VAL
      return ("Please include at least one task")
    }

    // createPost(postContent) -> TO CALL API

    // REMOVE THIS
    console.log(postContent)
    console.log(selectedGoals)
    console.log(selectedTasks)

    // RESET
    setPostContent("")
    setSelectedGoals([])
    setSelectedTasks([])
  }

  function addGoal(){
    // ADD A NEW GOAL WITH NULL VAL TO SELECTEDGOALS
  }

  function removeGoal(){
    // REMOVE A GOAL FROM SELECTED GOALS
    // + REMOVE THE SELECTED TASKS AS WELL -> CALL REMOVETASK()
  }

  function addTask(){
    // ADD A NEW TASK WITH NULL VAL TO SELECTEDTASKS
  }

  function removeTask(){
    // REMOVE A TASK FROM SELECTED TASKS
  }

  function setGoal(goal_id){
    console.log(goal_id)

    // BUT THIS WOULD ADD GOAL_ID TO GOALS EVERYTIME THE USER CHANGES THE SELECTION
    // I NEED TO TRACK WHICH GOAL(INDEX) OF THE GOALS USED FOR GOALSELECT
    // selectedGoals.push(goal_id)
    // setSelectedGoals() -> HOW???
  }

  return (
    <div>
      {/* CONTENT */}
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        className="w-full border rounded-md p-2 mb-4"
      />

      {/* GOAL SELECTION */}
      {/* MAP THROUGH SELECTED GOALS */}
      <GoalSelect goals={goals} selectRef={selectRef} setGoal={setGoal} />

      {/* TASK(S) SELECTION */}

      {/* ADD TASK BUTTON */}

      {/* ADD GOAL BUTTON */}


      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmitPost}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Post
      </button>
    </div>
  )
}
