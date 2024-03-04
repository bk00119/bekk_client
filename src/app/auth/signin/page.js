"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function SigninPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault() // Prevent default form submission

    console.log("waiting to login...") // REMOVE THIS
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleLogin} className="max-w-96">
        {/* EMAIL */}
        <div className="mb-2 max-w-96">
          <p className="text-lg">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-lg border-solid border-2 border-gray-400 outline-none	pl-2 w-full"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4 max-w-96">
          <p className="text-lg">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-lg border-solid border-2 border-gray-400 outline-none	pl-2 w-full"
          />
        </div>

        {/* SIGNIN BUTTON */}
        <button
          type="submit"
          className="rounded w-full py-1 text-white bg-gray-400 hover:bg-gray-500"
        >
          Log In
        </button>
      </form>
    </div>
  )
}

export default SigninPage
