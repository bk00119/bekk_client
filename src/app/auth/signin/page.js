"use client"

import { useRouter } from "next/navigation"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import InputField from "@components/auth/inputField"

function SigninPage() {
  const router = useRouter()

  async function handleLogin(data) {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    })

    const auth = await res.json()

    console.log(auth)

    // setUserData(await res.json())
    // setLoading(false)
  }

  const signinSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  })

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signinSchema}
        onSubmit={(values) => {
          handleLogin(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className="max-w-96">
            {/* EMAIL */}
            <InputField
              title="Email"
              name="email"
              type="email"
              errors={errors.email}
              touched={touched.email}
            />

            {/* PASSWORD */}
            <InputField
              title="Password"
              name="password"
              type="password"
              container_styles="mb-4"
              // errors={errors.password}
              // touched={touched.password}
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
