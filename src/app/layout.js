import { Inter } from "next/font/google"

import "./globals.css"
import StoreProvider from "./StoreProvider"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BEKK",
  description: "Manage your goals and share with others!",
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${inter.className} + min-h-screen flex flex-col justify-between`}
      >
        {/* ADD STOREPROVIDER WHEN REDUCERS ARE READY */}
        <StoreProvider>
          <div className="w-full flex flex-col justify-center items-center mb-4">
            <header className="w-full">
              <Navbar />
            </header>
            <main className="h-full mt-4 w-full max-w-7xl px-4">
              {children}
            </main>
          </div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
