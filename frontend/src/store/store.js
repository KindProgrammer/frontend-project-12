import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './api/chatApi.js';

export const store = configureStore({
    reducer: {
      [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
  })

export default store;