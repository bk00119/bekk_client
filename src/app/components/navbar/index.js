import Image from "next/image"
import Link from "next/link"
// import logo from "@public/logo.png"

export default function Navbar() {
  return (
    <nav className="bg-violet flex justify-center h-24 items-center  px-4">
      <div className="w-7xl">
        <Link href="/">
          {/* <Image src={logo} alt="logo" height={48} priority /> */}
          LOGO
        </Link>
      </div>
    </nav>
  )
}