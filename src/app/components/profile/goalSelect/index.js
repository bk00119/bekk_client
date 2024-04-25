import Select from "react-select"

import { useId } from "react"

export default function GoalSelect({ goals, selectRef, setGoal, index }) {
  // index: only if setting the goal in goals (array type)
  const goal_options = goals
    ? Object.entries(goals).map(([key, val]) => ({
        label: val.content,
        value: key,
      }))
    : []
  
  function hanldeGoalChange(goal_id){
    if (index != null){
      setGoal(goal_id, index)
    } else {
      setGoal(goal_id)
    }
  }

  return (
    <Select
      placeholder="Select a goal"
      ref={selectRef}
      options={goal_options}
      instanceId={useId()}
      onChange={(option) => hanldeGoalChange(option.value)}
      className="w-full mb-2"
    />
  )
}
