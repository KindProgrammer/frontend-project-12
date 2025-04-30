import { configureStore } from '@reduxjs/toolkit'
import { chatApi } from './api/chatApi.js'
import activeChannelReduser from './slices/activeChannelSlice.js'
import modalReduser from './slices/modalSlice.js'

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    activeChannel: activeChannelReduser,
    modal: modalReduser,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(chatApi.middleware),
})

export default store
