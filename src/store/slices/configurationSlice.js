import { createSlice } from "@reduxjs/toolkit";

const configurationSlice = createSlice({
  name: 'configuration',
  initialState: {
    status: 'progress',
  },
  reducers: {
    changeGameStatus: (state, status) => {
      state.status = status
    }
  }
})

export default configurationSlice.reducer
