'use server'

import { cookies } from "next/headers"

import Image from "next/image"
import Link from "next/link"
import logo from "@public/logo.png"
import LogoutButton from "./logout_button"

async function getCookies(){
  const cookieStore = cookies()
  const access_token = await cookieStore.get("access_token")

  // console.log(access_token)
  return access_token
}


export default async function Navbar() {
  // const cookieStore = cookies()
  // const access_token = cookieStore.get("access_token")
  // access_token = await fetchAccessTokenFromCookies()
  // console.log(access_token)

  const access_token = await getCookies()


  return (
    <nav className="flex justify-center h-24 items-center px-4">
      <div className="w-7xl flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" height={100} priority />
        </Link>
        {access_token ? (
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
