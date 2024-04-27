"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MdClose } from "react-icons/md"

import LikeButton from "../likeButton"
import CommentInput from "../commentInput"

export default function PostModal({
  openModal,
  setOpenModal,
  post_id,
  post_data,
  user_id,
  // username,
}) {
  const [comments, setComments] = useState([])
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!isLoaded) {
      loadComments()
    }
  }, [comments])

  async function loadComments() {
    try {
      const res = await fetch("/api/post/viewComments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: post_id,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setLoaded(true)
        setComments(data)
      } else {
        throw new Error("Failed to load comments")
      }
    } catch (error) {
      console.log("error loading comments: ", error)
    }
  }

  function close() {
    setOpenModal(false)
  }

  function reloadComments(){
    loadComments()
  }

  return (
    isLoaded && (
      <div className="fixed inset-0 z-50 flex items-start justify-center p-8">
        <dialog
          open={openModal}
          className="flex flex-col bg-white rounded-lg shadow-lg p-4 z-10 relative w-9/12 h-full"
        >
          <button
            className="text-gray-500 hover:text-gray-700 fixed top-4 right-4"
            onClick={close}
          >
            <MdClose size={36} className="text-white" />
          </button>

          <div className="flex p-8 overflow-y-hidden h-full">
            {/* POST SECTION */}
            <div className="w-full overflow-y-auto">
              {/* USERNAME */}
              {post_data.username && (
                <div className="mb-2">
                  <p>
                    <Link
                      href={`/profile/${post_data.user_id}`}
                      className="underline underline-offset-4 text-2xl font-medium mb-6"
                    >
                      {post_data.username}
                    </Link>
                  </p>
                </div>
              )}

              {/* POST CONTENT */}
              <div>
                <p className="text-3xl font-light">{post_data.content}</p>
              </div>

              {/* POST TASKS */}
              {post_data?.Tasks && post_data.Tasks.length > 0 && (
                <div className="mt-6 text-xl">
                  <p>Tasks:</p>
                  <ul className="list-disc pl-4 font-light list-inside">
                    {post_data?.Tasks &&
                      post_data.Tasks.map((task, index) => (
                        <li key={task._id}>{task.content}</li>
                      ))}
                  </ul>
                </div>
              )}

              {/* POST GOALS */}
              {post_data?.Goals && post_data.Goals.length > 0 && (
                <div className="mt-6 text-xl">
                  <p>Goals:</p>
                  <ul className="list-disc pl-4 font-light list-inside">
                    {post_data?.Goals &&
                      post_data.Goals.map((goal, index) => (
                        <li key={goal._id}>{goal.content}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="min-w-72 max-w-72 overflow-y-auto h-full ml-8 flex flex-col justify-between">
              {/* COMMENTS SECTION */}
              <div className="overflow-y-auto">
                {comments &&
                  comments.map((comment, index) => (
                    <div className="flex mb-2">
                      <p key={index} className="font-semibold">
                        {comment.username}
                      </p>
                      <p className="ml-2">{comment.comment}</p>
                    </div>
                  ))}
              </div>

              {/* BOTTOM COMPONENT */}
              <div>
                {/* LIKES */}
                <LikeButton
                  post_id={post_id}
                  user_id={user_id}
                  post_like_ids={post_data.like_ids}
                />
                {/* COMMENT INPUT */}
                <div className="mb-2"></div>
                <CommentInput user_id={user_id} post_id={post_id} reloadComments={reloadComments} />
              </div>
            </div>
          </div>
        </dialog>
        <div
          className="fixed inset-0 bg-black opacity-50 z-0"
          onClick={close}
        ></div>
      </div>
    )
  )
}
