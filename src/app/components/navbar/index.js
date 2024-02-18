import Image from "next/image"
import Link from "next/link"
import logo from "@public/logo.png"

export default function Navbar() {
  return (
    <nav className="bg-violet flex justify-between h-24 items-center px-4">
      <div className="w-7xl">
        <Link href="/">
          <Image src={logo} alt="logo" height={100} priority />
        </Link>
      </div>
    </nav>
  )
}
