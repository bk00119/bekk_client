import { cookies } from "next/headers"

export async function POST(req) {
  const reqData = await req.json()

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  })

  const status = res.status
  const data = await res.json()

  // SET COOKIES
  if (status == 200) {
    // HTTPONLY
    const cookie1 = cookies().set("access_token", data.access_token, {
      httpOnly: true,
      sameSite: "lax",
    })

    const cookie2 = cookies().set("refresh_token", data.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
    })

    // GENERAL USER DATA
    const user_id_cookie = cookies().set("user_id", data._id)
  }

  // REMOVE TOKENS FROM DATA
  delete data.access_token
  delete data.refresh_token

  return Response.json( data, { status: status })
}
