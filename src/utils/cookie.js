"use server"

import { cookies } from "next/headers"
import { verifyToken } from "./jwt"

export async function updateCookie(key, new_value) {
  const cookieStore = cookies()

  cookieStore.set(key, new_value)
}

export async function manageTokens() {
  const cookieStore = cookies()

  const access_token = cookieStore.get("access_token")
  const refresh_token = cookieStore.get("refresh_token")

  // UPDATE ACCESS_TOKEN IF EXPIRED
  if (access_token && refresh_token) {
    const access_token_data = await verifyToken(access_token.value)
    const refresh_token_data = await verifyToken(refresh_token.value)

    if (refresh_token_data) {
      if (!access_token_data) {
        // ONLY ACCESS_TOKEN IS EXPIRED -> UPDATE ACCESS_TOKEN

        const new_access_token = refresh_token
        // cookieStore.set("access_token", new_access_token)
        updateCookie("access_token", new_access_token)
      }
    } else {
      // REFRESH_TOKEN IS EXPIRED -> SIGN OUT
      // cookieStore.delete("access_token")
      // cookieStore.delete("refresh_token")
    }
  }
}

export async function testToken(){
  'use server'
  const cookieStore = cookies()
  cookieStore.set("hello", "brian")
}