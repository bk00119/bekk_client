"use client"

import { FaRegHeart, FaHeart } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LikesModal from "../LikesModal"

export default function LikeButton({ post_id, user_id, post_like_ids }) {
  const curr_user_id = useSelector((state) => {
    return state.userData._id
  })

  const [isLoaded, setLoaded] = useState(false)
  const [isLiked, setLiked] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [likedUsers, setLikedUsers] = useState([])
  const [numLikes, setNumLikes] = useState(post_like_ids.length)

  useEffect(() => {
    if (!isLoaded && curr_user_id) {
      setLiked(checkIsPostLiked())
      setLoaded(true)
    }
  }, [curr_user_id, isLiked])

  function checkIsPostLiked() {
    for (const id of post_like_ids) {
      if (curr_user_id == id) {
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

  async function viewLikes() {
    try {
      const res = await fetch("/api/post/viewLikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: post_id,
        }),
      })
      if (res.ok) {
        setOpenModal(true)
        const data = await res.json()
        setLikedUsers(data?.users)
      } else {
        throw new Error("Failed to like post")
      }
    } catch (error) {
      console.log("error post like: ", error)
    }
  }

  return (
    <div className="flex items-center mt-4">
      {curr_user_id && isLiked ? (
        <button onClick={unlikePost}>
          <FaHeart className="text-blue-500 text-lg" />
        </button>
      ) : (
        <button onClick={likePost}>
          <FaRegHeart className="text-blue-500 text-lg" />
        </button>
      )}

      {/* CLICK ON {NUM} LIKES TO VIEW WHO LIKED THE POSTS "LIKED BY..." */}
      <button className="ml-2" onClick={viewLikes}>
        {numLikes} {numLikes > 1 ? "likes" : "like"}
      </button>

      {openModal && (
        <LikesModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          users={likedUsers}
        />
      )}
    </div>
  )
}
