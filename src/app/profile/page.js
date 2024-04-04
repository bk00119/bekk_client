"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function ProfilePageInner(){
  const searchParams = useSearchParams()
  const profile_id = searchParams.get("id")
  const [userData, setUserData] = useState(null)
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [postContent, setPostContent] = useState("");
  const [isLoading, setLoading] = useState(true)
  const [isAddingTask, setIsAddingTask] = useState(false)



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
        //hypothetical fields in collection
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
  const handleAddTask = (event) => {
    try {
      console.log('here')
      const taskContent = event.target.textContent;
      handleCreateTask(taskContent);
    } catch (error){
      console.error('Error adding task', error)
    }
    
  }
  const handleCreateTask = async (taskContent) => {
    try {
      const res = await fetch("/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //hypothetical fields in collection
          user_id: profile_id,
          goal_id : "123456",
          is_completed: false,
          content: taskContent
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to create task');
      }
      console.log(await res.json());
      console.log("Task created");

    }
    catch (error) {
      console.log('error creating task: ', error)
    }
  }

  if (isLoading) return <div className="w-full">Loading...</div>

  if (!userData) return <div className="w-full">No profile data</div>

  return (
    <div className="w-full flex justify-between">

      {/* Profile Section */}
      <div className="w-1/2">
        {/* <h2 className="mb-4 text-lg font-semibold">Your Profile:</h2>
        <div>profile: {userData?.username}</div>
        <div>
          name: {userData?.first_name} {userData?.last_name}
        </div> */}
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
      </div>
      {/* Tasks Section */}
      <div className="w-1/2 p-4 border rounded">
        <h2 className="mb-4 text-lg font-semibold">Tasks:</h2>
        <ul className="list-disc ml-6">
          {/* Display tasks here
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))} */}
        </ul>
        {/* Add Task Form */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Add Task:</h3>
          <input
            type="text"
            //alue={newTask}
            //onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task"
            className="w-full border rounded-md p-2 mb-2"
          />
          <button onClick={handleAddTask} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Add Task
          </button>
        </div>
      </div>

      
    </div>
  );
}

export default function ProfilePage() {
  return (
    // useSearchParams() needs to be wrapped in a Suspense boundary.
    <Suspense>
      <ProfilePageInner />
    </Suspense>
  )
}
