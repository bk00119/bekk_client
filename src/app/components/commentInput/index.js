"use client"

import { useState } from "react"

export default function CommentInput({ user_id, post_id, reloadComments }) {
  const [comment, setComment] = useState("")

  async function postComment(e) {
    // TO PREVENT FROM RELOADING
    e.preventDefault()
    if (!comment || comment?.length === 0){
      return alert("Please add a comment")
    }
    try {
      const res = await fetch("/api/post/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: post_id,
          content: comment,
        }),
      })
      if (res.ok) {
        setComment("")
        reloadComments()
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.log("error creating task: ", error)
    }
  }

  return (
    <form onSubmit={postComment} className="flex">
      <input
        className="w-full border rounded-md py-1 px-2 focus:outline-none"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button className="ml-2" onClick={postComment}>
        Post
      </button>
    </form>
  )
}
