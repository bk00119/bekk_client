import { cookies } from "next/headers"

import { verifyToken } from "@/utils/jwt"

export async function POST(req) {
  const reqData = await req.json()
  const access_token = cookies().get("access_token")
  const refresh_token = cookies().get("refresh_token")
  if (!access_token) {
    return Response.error("No access token")
  }
  if (!refresh_token) {
    return Response.error("No refresh token")
  }
  reqData.access_token = access_token.value
  reqData.refresh_token = refresh_token.value

  const access_token_data = await verifyToken(access_token.value)
  if (!access_token_data) {
    return Response.error("Invalid access token")
  }

  // INCLUDE USER_ID FROM THE SERVER-SIDE
  reqData.user_id = access_token_data.user_id

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/delete/goal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    }
  )

  const data = await res.json()

  return Response.json(data, { status: res.status })
}
