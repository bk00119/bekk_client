"use client"

import { useRouter } from "next/navigation"
import { Formik, Form } from "formik"
import InputField from "@components/auth/inputField"

function SignupPage() {
  const router = useRouter()

  async function handleSignup() {
    console.log("waiting to signup...") // REMOVE THIS
  }

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={{
          email: "",
          f_name: "",
          l_name: "",
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          console.log(values)

          handleSignup()
        }}
      >
        {({ errors, touched }) => (
          <Form className="max-w-96">
            {/* EMAIL */}
            <InputField title="Email" name="email" type="email" />

            {/* FIRST NAME */}
            <InputField title="First name" name="f_name" type="text" />

            {/* LAST NAME */}
            <InputField title="Last name" name="l_name" type="text" />

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
