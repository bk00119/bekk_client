"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import NewPostButton from "./newPostButton"
import NewPostField from "./newPostField"

export default function NewPostContainer({ user_id, goals }) {
  const router = useRouter()
  const [isAddingPost, setIsAddingPost] = useState(false)

  async function handleCreatePost(content, task_ids, goal_ids) {
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          user_id: user_id,
          task_ids: task_ids,
          goal_ids: goal_ids,
        }),
      })
      if (res.ok) {
        setIsAddingPost(false)
        router.refresh()
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.log("error creating post: ", error)
    }
  }

  function handleAddPost() {
    setIsAddingPost(true)
  }

  return (
    <div>
      {isAddingPost ? (
        <NewPostField
          createPost={handleCreatePost}
          goals={goals}
          setIsAddingPost={setIsAddingPost}
        />
      ) : (
        <NewPostButton handleAddPost={handleAddPost} />
      )}
    </div>
  )
}
