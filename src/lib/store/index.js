import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

export function makeStore() {
  return configureStore({
    reducer: {

    },
  })
}

export const wrapper = createWrapper(makeStore)