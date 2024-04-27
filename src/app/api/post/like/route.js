import { cookies } from "next/headers"

export async function POST(req) {
  const reqData = await req.json()
  const access_token = cookies().get("access_token")
  const refresh_token = cookies().get("refresh_token")
  if (!access_token){
    return Response.error("No access token")
  }
  if (!refresh_token){
    return Response.error("No refresh token")
  }
  reqData.access_token = access_token.value
  reqData.refresh_token = refresh_token.value

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/like/post`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData)
  })

  const data = await res.json()

  return Response.json( data, { status: res.status })
}
