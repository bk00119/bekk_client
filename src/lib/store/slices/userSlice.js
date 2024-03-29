import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  _id: null,
  username: null,
  email: null,
  first_name: null,
  last_name: null,
}

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    updateId(state, action){
      state._id = action.payload
    },
    updateUser(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    resetUser(state, action) {
      return initialState
    },
  },
})

export const { updateId, updateUser, resetUser } = userDataSlice.actions
export const userDataReducer = userDataSlice.reducer
