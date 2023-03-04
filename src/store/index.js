import { configureStore } from "@reduxjs/toolkit"
import configurationSlice from "./slices/configurationSlice"

const store = configureStore({
  reducer: {
    configuration: configurationSlice,
  }
})

export default store
