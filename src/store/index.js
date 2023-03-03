import { configureStore } from "@reduxjs/toolkit"
import configurationSlice from "./slices/configurationSlice"
import cellsSlice from "./slices/cellsSlice"

const store = configureStore({
  reducer: {
    configuration: configurationSlice,
    cells: cellsSlice
  }
})

export default store
