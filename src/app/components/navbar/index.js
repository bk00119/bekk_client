import Image from "next/image"
import Link from "next/link"
import logo from "@public/logo.png"

export default function Navbar() {
  return (
    <nav className="bg-violet flex justify-between h-24 items-center px-4 md:px-8">
      <div className="w-7xl">
        <Link href="/">
          <Image src={logo} alt="logo" height={100} priority />
        </Link>
      </div>
      <div>
        <Link href="/signup" className =  "inline-block rounded-full px-4 py-2 bg-gray-300 text-gray-800 mr-4">
          Sign Up
        </Link>
        <Link href="/signin">
          Sign In
        </Link>
      </div>
    </nav>
  )
}
