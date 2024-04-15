"use client"

export default function NewTaskField() {
  function handleAddTask(event) {
    try {
      console.log("here")
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
      <h3 className="text-lg font-semibold mb-2">Add Task:</h3>
      <input
        type="text"
        //alue={newTask}
        //onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task"
        className="w-full border rounded-md p-2 mb-2"
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
