import { cookies } from "next/headers"

export async function GET(req) {
  cookies().delete("access_token")
  cookies().delete("refresh_token")

  return Response.json({ message: "Logout successful" }, { status: 200 })
}
