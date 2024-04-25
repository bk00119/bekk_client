import Select from "react-select"

import { useId } from "react"

export default function GoalSelect({ goals, selectRef, setGoal }) {
  const goal_options = goals
    ? Object.entries(goals).map(([key, val]) => ({
        label: val.content,
        value: key,
      }))
    : []

  return (
    <Select
      placeholder="Select a goal"
      ref={selectRef}
      options={goal_options}
      instanceId={useId()}
      onChange={(option) => setGoal(option.value)}
      className="w-full mb-2"
    />
  )
}
