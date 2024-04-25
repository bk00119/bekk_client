"use client"

export default function NewPostButton({ handleAddPost }) {
  return (
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
  )
}
