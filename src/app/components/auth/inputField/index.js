"use client"

import { Field } from "formik"

export default function InputField({
  title,
  name,
  type,
  container_styles,
  title_styles,
  input_styles,
  errors,
  touched
}) {
  return (
    <div className={`mb-2 max-w-96 ` + container_styles}>
      <p className={`text-lg ` + title_styles}>{title}</p>
      <Field
        name={name}
        as="input"
        type={type}
        className={
          `text-lg border-solid border-2 border-gray-400 outline-none	pl-2 w-full ` +
          input_styles
        }
        required
        autoComplete="true"
      />
      {errors && touched ? (
        <div className="text-red-600">{errors}</div>
      ) : null}
    </div>
  )
}
