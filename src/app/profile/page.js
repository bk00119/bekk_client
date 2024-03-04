"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const profile_id = searchParams.get("id")
  const [userData, setUserData] = useState(null)
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [postContent, setPostContent] = useState("");
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    if (isLoading) {
      getUserData()
    }
  }, [])

  async function getUserData() {
    const res = await fetch("/api/profile/getUserData", {
      method: "POST",
      body: JSON.stringify({
        _id: profile_id,
      }),
    })
    setUserData(await res.json())
    setLoading(false)
  }

  const handleCreatePost = async (content) => {
    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        user_id: profile_id,
      }),
    });
    console.log(await res.json());
    console.log("Post created");
  };
  const handleAddPost = () => {
    setIsAddingPost(true);
  };
  const handleSubmitPost = () => {
    if (postContent.trim() !== "") {
      handleCreatePost(postContent);
      setPostContent("");
      setIsAddingPost(false);
    }
  };
  if (isLoading) return <div className="w-full">Loading...</div>

  if (!userData) return <div className="w-full">No profile data</div>

  // return (

  //   <div className="w-full">
  //     {isAddingPost ? (
  //       <div>
  //         <textarea
  //           value={postContent}
  //           onChange={(e) => setPostContent(e.target.value)}
  //           placeholder="Write your post here..."
  //           rows={4}
  //           cols={50}
  //           required
  //           className="w-full border rounded-md p-2 mb-4"
  //         />
  //         <button onClick={handleSubmitPost} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Create Post</button>
  //       </div>
  //     ) : (
  //       <button onClick={handleAddPost} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add Post</button>
  //     )}
  //     <div>profile: {userData?.username}</div>
  //     <div>
  //       name: {userData?.first_name} {userData?.last_name}
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-semibold">Your Profile:</h2>
      {isAddingPost ? (
        <div>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            className="w-full border rounded-md p-2 mb-4"
          />
          <button onClick={handleSubmitPost} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Post
          </button>
        </div>
      ) : (
        <button onClick={handleAddPost} className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg">
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
      <div>profile: {userData?.username}</div>
      <div>
        name: {userData?.first_name} {userData?.last_name}
      </div>
    </div>
  );
}
