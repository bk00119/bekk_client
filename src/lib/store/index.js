import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import { updateId, updateUser, resetUser, userDataReducer } from "./slices/userSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      userData: userDataReducer,
    },
  })
}

export const wrapper = createWrapper(makeStore)

export { updateId, updateUser, resetUser }
