export async function POST(req) {
  const reqData = await req.json()
  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/view/user/public`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: reqData._id,
      }),
    }
  )

  const status = res.status
  const data = await res.json()

  return Response.json( data, { status: status })
}
