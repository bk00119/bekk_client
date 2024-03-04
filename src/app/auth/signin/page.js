"use client"

import { useRouter } from "next/navigation"
import { Formik, Form } from "formik"
import InputField from "@components/auth/inputField"

function SigninPage() {
  const router = useRouter()

  async function handleLogin() {
    console.log("waiting to login...") // REMOVE THIS
  }

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          console.log(values)

          handleLogin()
        }}
      >
        {({ errors, touched }) => (
          <Form className="max-w-96">
            {/* EMAIL */}
            <InputField title="Email" name="email" type="email" />

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
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SigninPage
