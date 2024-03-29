'use client'

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Cookies from 'js-cookie';

import Image from "next/image"
import Link from "next/link"
import logo from "@public/logo.png"
import LogoutButton from "./logout_button"
import { updateId, updateUser } from "@/lib/store";

export default function Navbar() {
  const dispatch = useDispatch()
  const user_id = Cookies.get('user_id')
  const user = useSelector(({ userData }) => {
    return userData
  })

  async function getUserData(user_id){
    const res = await fetch("/api/profile/getUserData", {
      method: "POST",
      body: JSON.stringify({
        _id: user_id,
      }),
    })
    const data = await res.json()
    dispatch(updateUser(data))
    return data
  }

  useEffect(()=> {
    if(user_id && !user._id){
      const user_id = Cookies.get('user_id')
      dispatch(updateId(user_id))
      
      // FETCH USER DATA AND UPDATE USERDATA
      const data = getUserData(user_id)
    }
  },[user])

  return (
    <nav className="flex justify-center h-24 items-center px-4">
      <div className="w-7xl flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" height={100} priority />
        </Link>
        {user._id ? (
          <div>
            <LogoutButton />
          </div>
        ) : (
          <div>
            <Link
              href="/auth/signup"
              className="inline-block rounded-full px-4 py-2 bg-gray-300 text-gray-800 mr-4"
            >
              Sign Up
            </Link>
            <Link href="/auth/signin">Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
