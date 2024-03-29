import { cookies } from "next/headers"

export async function GET(req) {
  cookies().delete("access_token")
  cookies().delete("refresh_token")
  cookies().delete("user_id")

  return Response.json({ message: "Logout successful" }, { status: 200 })
}
