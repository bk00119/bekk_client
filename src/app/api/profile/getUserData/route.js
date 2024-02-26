export async function POST(req) {
  const reqData = await req.json()
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/viewUserPublic`, {
  // const res = await fetch("https://bk00119.pythonanywhere.com/viewUserPublic", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id: '6575033f3b89d2b4f309d7af'
    })
  })

  const data = await res.json()

  return Response.json(data)
}