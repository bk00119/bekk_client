"use client"

import { useState } from "react"

export default function NewPostField({ user_id }) {
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [postContent, setPostContent] = useState("")

  async function handleCreatePost() {
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
    console.log(await res.json())
    console.log("Post created")
  }

  function handleAddPost() {
    setIsAddingPost(true)
  }

  function handleSubmitPost() {
    if (postContent.trim() !== "") {
      handleCreatePost()

      // reset
      setPostContent("")
      setIsAddingPost(false)
    }
  }

  return (
    <div>
      {isAddingPost ? (
        <div>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            className="w-full border rounded-md p-2 mb-4"
          />
          <button
            onClick={handleSubmitPost}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Post
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddPost}
          className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg"
        >
          <svg
            className="w-6 h-6 mr-2 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M14 9a1 1 0 00-1-1h-3V5a1 1 0 00-2 0v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 001-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Post
        </button>
      )}
    </div>
  )
}
