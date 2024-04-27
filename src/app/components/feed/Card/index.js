"use server"

import Link from "next/link"
import LikeButton from "../../likeButton"

export default async function FeedCard({
  post_id,
  post_data,
  username,
  user_id,
}) {
  return (
    <div className="w-auto bg-white shadow-md mb-8 p-4 rounded-lg task-list-container">
      <div className="mb-2">
        <p>
          <Link
            href={`/profile/${post_data.user_id}`}
            className="underline underline-offset-4 text-lg font-medium"
          >
            {post_data.username ? post_data.username : username}
          </Link>
        </p>
      </div>
      <div className="mb-2">
        <p>{post_data.content}</p>
      </div>
      <div className="flex items-center">
        <div className="task-list">
          <p className="font-medium">Tasks:</p>
          <ul className="list-disc pl-4">
            {post_data.task_ids &&
              post_data.task_ids.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center">
        <div className="task-list">
          <p className="font-medium">Goals:</p>
          <ul className="list-disc pl-4">
            {post_data.goal_ids &&
              post_data.goal_ids.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
          </ul>
        </div>
      </div>

      {/* LIKES */}
      <LikeButton
        post_id={post_id}
        user_id={user_id}
        post_like_ids={post_data.like_ids}
      />

      {/* COMMENTS */}
      <div className="mt-4">
        {/* OPEN A PAGE WITH POST/{POST_ID} AND SHOW ALL COMMENTS + LET USER WRITE COMMENTS*/}
        <button className="text-gray-500">
          View all {post_data.comment_ids.length} comments
        </button>

        {/* ONE OF THE COMMENTS */}
        <div className="mt-2 flex justify-between items-center text-sm">
          <div className="flex">
            <p className="font-semibold">{post_data?.comments?.username}</p>
            <p className="ml-2">{post_data?.comments?.content}</p>
          </div>
          <p>
            {new Date(post_data?.comments?.timestamp).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* ADD COMMENT */}
        {/* OPEN A PAGE WITH POST/{POST_ID} AND SHOW ALL COMMENTS + LET USER WRITE COMMENTS*/}
        <button className="mt-2 text-gray-500">Add a comment...</button>
        
      </div>
    </div>
  )
}
