import { cookies } from 'next/headers'

export async function POST(req) {
  const reqData = await req.json()

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData)
  })

  const data = await res.json()

  // SET HTTPONLY COOKIES
  const cookie1 = cookies().set('access_token', data.access_token, {
    httpOnly: true,
    sameSite: 'lax',
  })

  const cookie2 = cookies().set('refresh_token', data.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
  })

  // REMOVE TOKENS FROM DATA
  delete data.access_token 
  delete data.refresh_token

  return Response.json(data)
}