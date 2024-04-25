"use client"

import { useState } from "react"
import NewPostButton from "./newPostButton"
import NewPostField from "./newPostField"

export default function NewPostContainer({ user_id, goals }) {
  const [isAddingPost, setIsAddingPost] = useState(false)

  async function handleCreatePost(postContent) {
    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //hypothetical fields in collection
        content: postContent,
        user_id: user_id,
      }),
    })
    // console.log(await res.json())
    console.log("Post created")
  }

  function handleAddPost() {
    setIsAddingPost(true)
  }

  function handleSubmitPost(postContent) {
    // if (postContent.length > 0) {
    // handleCreatePost(postContent)
    console.log(postContent)

    // reset
    setIsAddingPost(false)

    // ROUTER REFRESH
    // }
  }

  return (
    <div>
      {isAddingPost ? (
        <NewPostField
          createPost={handleSubmitPost}
          goals={goals}
          setIsAddingPost={setIsAddingPost}
        />
      ) : (
        <NewPostButton handleAddPost={handleAddPost} />
      )}
    </div>
  )
}
