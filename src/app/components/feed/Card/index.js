import { FaRegHeart } from "react-icons/fa"
import Link from "next/link"

export default function FeedCard({ task_id, task_data }) {
  // CHANGE TO Post data, not Task

  return (
    <div className="w-auto bg-white drop-shadow mb-8 p-4">
      <div className="mb-2">
        <p><Link
            href={`/profile?id=${task_data.user_id}`}
            className="underline underline-offset-4 text-lg font-medium"
          >
            {/* USERNAME: USING A TEMPORARY USERNAME. NEED TO CHANGE LATER */}
            hk0207
            </Link></p>
      </div>
      <div className="mb-2">
        <p className="text-lg font-medium">What I did today:</p>
        <p>{task_data.content}</p>
      </div>
      <div className="flex items-center">
        <FaRegHeart className="mr-2" />
        <p>{task_data.likes?.length}</p>
      </div>
    </div>
  )
}
