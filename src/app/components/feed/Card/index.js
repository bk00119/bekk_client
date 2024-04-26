import { FaRegHeart, FaHeart } from "react-icons/fa"
import Link from "next/link"

export default function FeedCard({ post_id, post_data, username, user_id }) {
  function checkIsPostLiked(){
    for(const id of post_data?.like_ids){
      if (user_id == id){
        return true
      }
    }
    return false
  }

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
      <div className="flex items-center mt-4">
        {checkIsPostLiked() ? <FaHeart className="text-blue-500 text-lg"/> : <FaRegHeart className="text-blue-500 text-lg"/>}
        <p className="ml-1">{post_data.like_ids.length}</p>
      </div>
    </div>
  )
}
