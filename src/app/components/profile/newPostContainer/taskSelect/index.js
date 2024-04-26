"use client"

import Select from "react-select"
import { useId, useEffect, useState } from "react"

// USED FOR NewPostField COMPONENT
export default function TaskSelect({
  tasks,
  selectRef,
  setTask,
  goal_index,
  index,
  selectedGoals,
  selectedTasks,
}) {
  // index, selectedGoals, selectedTasks: only if setting the task in tasks (array type)

  const [taskOptions, setTaskOptions] = useState([])

  useEffect(() => {
    if (selectedGoals[goal_index] != null) {
      setTaskOptions(
        tasks.map((task) => ({
          label: task.content,
          value: task._id,
        }))
      )
    }
  }, [tasks])

  function hanldeTaskChange(task) {
    if (index != null) {
      setTask(task, index, goal_index)
    } else {
      setTask(task_id)
    }
  }

  return (
    <Select
      placeholder="Select a task"
      ref={selectRef}
      value={
        selectedTasks[goal_index][index] && {
          label: selectedTasks[goal_index][index]?.label,
          value: selectedTasks[goal_index][index]?.value,
        }
      }
      options={taskOptions}
      instanceId={useId()}
      onChange={(option) => hanldeTaskChange(option)}
      className="w-full mb-2"
    />
  )
}
