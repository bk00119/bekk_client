import { FaRegHeart } from "react-icons/fa"
import Link from "next/link"

export default function FeedCard({ post_id, post_data, username }) {
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

      <FaRegHeart />
    </div>
  )
}
