import Select from "react-select"

import { useId } from "react"

export default function GoalSelect({
  goals,
  selectRef,
  setGoal,
  index,
  selectedGoals,
}) {
  // index, selectedGoals: only if setting the goal in goals (array type)

  const goal_options = goals
    ? Object.entries(goals).map(([key, val]) => ({
        label: val.content,
        value: key,
      }))
    : []

  function hanldeGoalChange(goal) {
    if (index != null) {
      setGoal(goal, index)
    } else {
      setGoal(goal.value)
    }
  }

  return (
    <Select
      placeholder="Select a goal"
      ref={selectRef}
      value={
        selectedGoals &&
        selectedGoals[index] && {
          label: selectedGoals[index]?.label,
          value: selectedGoals[index]?.value,
        }
      }
      options={goal_options}
      instanceId={useId()}
      onChange={(option) => hanldeGoalChange(option)}
      className="w-full mb-2"
    />
  )
}
