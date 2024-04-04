"use client"

import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { Formik, Form } from "formik"

import InputField from "@components/auth/inputField"
import { updateUser } from "@/lib/store"

function SignupPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  async function handleSignup(data) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    })

    const resData = await res.json()
    if (res.status === 200){
      dispatch(updateUser(resData))
      router.push("/")
    } else {
      alert(resData.message)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={{
          email: "",
          first_name: "",
          last_name: "",
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          handleSignup(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className="max-w-96">
            {/* EMAIL */}
            <InputField title="Email" name="email" type="email" />

            {/* FIRST NAME */}
            <InputField title="First name" name="first_name" type="text" />

            {/* LAST NAME */}
            <InputField title="Last name" name="last_name" type="text" />

            {/* USERNAME */}
            <InputField title="Username" name="username" type="text" />

            {/* PASSWORD */}
            <InputField
              title="Password"
              name="password"
              type="password"
              container_styles="mb-4"
            />

            {/* SIGNIN BUTTON */}
            <button
              type="submit"
              className="rounded w-full py-1 text-white bg-gray-400 hover:bg-gray-500"
            >
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignupPage
