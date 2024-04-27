"use server"

import Link from "next/link"
import LikeButton from "../../likeButton"
import CommentButton from "./commentButton"

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
      <div className="">
        <p className="text-xl">{post_data.content}</p>
      </div>
      {post_data?.Tasks && post_data.Tasks.length > 0 && (
        <div className="mt-2">
          <p>Tasks:</p>
          <ul className="list-disc pl-4 font-light">
            {post_data?.Tasks &&
              post_data.Tasks.map((task, index) => (
                <li key={task._id}>{task.content}</li>
              ))}
          </ul>
        </div>
      )}
      {post_data?.Goals && post_data.Goals.length > 0 && (
        <div className="mt-2">
          <p>Goals:</p>
          <ul className="list-disc pl-4 font-light">
            {post_data?.Goals &&
              post_data.Goals.map((goal, index) => (
                <li key={goal._id}>{goal.content}</li>
              ))}
          </ul>
        </div>
      )}

      {/* LIKES */}
      <LikeButton
        post_id={post_id}
        user_id={user_id}
        post_like_ids={post_data.like_ids}
      />

      {/* COMMENTS */}
      <div className="mt-4">
        {/* OPEN A PAGE WITH POST/{POST_ID} AND SHOW ALL COMMENTS + LET USER WRITE COMMENTS*/}
        <CommentButton
          className="text-gray-500"
          post_id={post_id}
          post_data={post_data}
          user_id={user_id}
        >
          View all {post_data.comment_ids.length} comments
        </CommentButton>

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
        {/* <button className="mt-2 text-gray-500">Add a comment...</button> */}
        <CommentButton
          className="mt-2 text-gray-500"
          post_id={post_id}
          post_data={post_data}
          user_id={user_id}
        >
          Add a comment
        </CommentButton>
      </div>
    </div>
  )
}
