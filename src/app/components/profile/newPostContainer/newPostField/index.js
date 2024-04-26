"use client"

import { useRef, useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"

import GoalSelect from "../../goalSelect"
import TaskSelect from "../taskSelect"

export default function NewPostField({ createPost, goals, setIsAddingPost }) {
  const selectRef = useRef(null)
  const [postContent, setPostContent] = useState("")
  const [selectedGoals, setSelectedGoals] = useState([null])
  const [selectedTasks, setSelectedTasks] = useState([[null]])

  function resetField() {
    setPostContent("")
    setSelectedGoals([null])
    setSelectedTasks([[null]])
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
    if (checkNullIn2DArray(selectedTasks)) {
      return alert("Please select a task")
    }

    // FETCH ONLY THE VALUES FROM SELECTEDGOALS
    const selectedGoalValues = selectedGoals.map((goal) => goal.value)

    // FETCH ONLY THE VALUES FROM SELECTEDTASKS
    let selectedTaskValues = selectedTasks.flat()
    selectedTaskValues = selectedTaskValues.map((task) => task.value)

    // CALL API FUNCTION
    // content, task_ids, goals_ids
    createPost(postContent, selectedTaskValues, selectedGoalValues)
    // resetField()
  }

  function checkNullInArray(arr) {
    for (const elem of arr) {
      if (elem == null) {
        return true
      }
    }
    return false
  }

  function checkNullIn2DArray(arr) {
    for (const goal of arr) {
      for (const task of goal) {
        if (task == null) {
          return true
        }
      }
    }
    return false
  }

  // ADD A NEW GOAL WITH NULL VAL TO SELECTEDGOALS
  function addGoal() {
    setSelectedGoals([...selectedGoals, null])
    addTask()
  }

  // REMOVE A GOAL FROM SELECTED GOALS
  function removeGoal(index) {
    if (selectedGoals.length == 1) {
      return alert("Please include at least one goal")
    }

    // REMOVE TASKS ATTACHED TO THE GOAL
    const updated_tasks = [...selectedTasks]
    updated_tasks.splice(index, 1)
    setSelectedTasks(updated_tasks)

    // REMOVE THE GOAL
    const updated_goals = [...selectedGoals]
    updated_goals.splice(index, 1)
    setSelectedGoals(updated_goals)
  }

  // ADD A NEW TASK WITH NULL VAL TO SELECTEDTASKS
  function addTask(index = -1) {
    // index: -1 -> ADD A NEW OUTER ARRAY (NEW GOAL IS ADDED)
    if (index === -1) {
      setSelectedTasks([...selectedTasks, [null]])
    } else {
      const updated_tasks = [...selectedTasks]
      updated_tasks[index] = [...updated_tasks[index], null]
      setSelectedTasks(updated_tasks)
    }
  }

  // REMOVE A TASK FROM SELECTED TASKS
  function removeTask(index, goal_index) {
    if (selectedTasks[goal_index].length == 1) {
      return alert("You need to delete the goal first")
    }

    const updated_tasks = [...selectedTasks]
    updated_tasks[goal_index].splice(index, 1)
    setSelectedTasks(updated_tasks)
  }

  // CHANGE SELECTEDGOALS WHEN A NEW GOAL IS SELECTED
  function setGoal(goal, index) {
    const updated_goals = selectedGoals.map((elem, i) => {
      if (index === i) {
        return goal
      } else {
        return elem
      }
    })
    setSelectedGoals(updated_goals)

    // RESET TASKS ATTACHED TO THE GOAL
    const updated_tasks = [...selectedTasks]
    updated_tasks[index] = [null]
    setSelectedTasks(updated_tasks)
  }

  // CHANGE SELECTEDTASKS WHEN A NEW TASK IS SELECTED
  function setTask(task, index, goal_index) {
    const updated_tasks = [...selectedTasks]
    updated_tasks[goal_index][index] = task
    setSelectedTasks(updated_tasks)
  }

  return (
    <div className="w-full flex flex-col">
      {/* CONTENT */}
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        className="w-full border rounded-md p-2 mb-4 outline-blue-400	outline-1"
      />

      {/* GOAL SELECTION */}
      {selectedGoals.map((goal, index) => (
        <div key={index}>
          <p className="mb-1">Goal {index + 1}</p>
          <div className="w-full flex">
            <GoalSelect
              goals={goals}
              selectRef={selectRef}
              setGoal={setGoal}
              index={index}
              selectedGoals={selectedGoals}
            />
            <button
              onClick={() => removeGoal(index)}
              className="size-fit p-3 ml-2 bg-gray-200 rounded"
            >
              <MdClose />
            </button>
          </div>
          <div>
            <p className="mb-1">Tasks for Goal {index + 1}</p>
            {/* TASK(S) SELECTION */}
            {selectedTasks[index].map((task, task_index) => (
              <div key={task_index} className="w-full flex">
                <TaskSelect
                  tasks={goals[goal?.value]?.tasks}
                  selectRef={selectRef}
                  setTask={setTask}
                  goal_index={index}
                  index={task_index}
                  selectedGoals={selectedGoals}
                  selectedTasks={selectedTasks}
                />
                <button
                  onClick={() => removeTask(task_index, index)}
                  className="size-fit p-3 ml-2 bg-gray-200 rounded"
                >
                  <MdClose />
                </button>
              </div>
            ))}

            {/* ADD TASK BUTTON */}
            <button
              className="w-fit mb-4 flex items-center bg-gray-400 hover:bg-gray-500 rounded py-1 px-2 text-sm text-white"
              onClick={() => addTask(index)}
            >
              <MdAdd className="mr-1" />
              Add task
            </button>
          </div>
        </div>
      ))}

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
