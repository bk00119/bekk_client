"use client"

import { FaRegHeart, FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react"

export default function LikeButton({ post_id, user_id, post_like_ids }) {
  const [isLiked, setLiked] = useState(checkIsPostLiked())
  const [numLikes, setNumLikes] = useState(post_like_ids.length)

  useEffect(() => {}, [isLiked])

  function checkIsPostLiked() {
    for (const id of post_like_ids) {
      if (user_id == id) {
        return true
      }
    }
    return false
  }

  async function likePost() {
    try {
      const res = await fetch("/api/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: post_id,
          user_id: user_id,
        }),
      })
      if (res.ok) {
        setLiked(!isLiked)
        setNumLikes(numLikes + 1)
      } else {
        throw new Error("Failed to like post")
      }
    } catch (error) {
      console.log("error post like: ", error)
    }
  }

  async function unlikePost() {
    try {
      const res = await fetch("/api/post/unlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: post_id,
          user_id: user_id,
        }),
      })
      if (res.ok) {
        setLiked(!isLiked)
        setNumLikes(numLikes - 1)
      } else {
        throw new Error("Failed to unlike post")
      }
    } catch (error) {
      console.log("error post unlike: ", error)
    }
  }

  return (
    <div className="flex items-center mt-4">
      {isLiked ? (
        <button onClick={unlikePost}>
          <FaHeart className="text-blue-500 text-lg" />
        </button>
      ) : (
        <button onClick={likePost}>
          <FaRegHeart className="text-blue-500 text-lg" />
        </button>
      )}

      {/* CLICK ON {NUM} LIKES TO VIEW WHO LIKED THE POSTS "LIKED BY..." */}
      <button className="ml-2">
        {numLikes} {numLikes > 1 ? "likes" : "like"}
      </button>
    </div>
  )
}
