import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath } from '../../routes.js';
import { io } from 'socket.io-client';

const socket = io();

const addSocketListener = async (
  initSocket,
  event,
  cacheDataLoaded,
  updateCachedData,
  cacheEntryRemoved,
) => {
  try {
    await cacheDataLoaded;
    const handleEvent = (payload) => updateCachedData((draft) => {
      switch (event) {
        case 'newMessage':
          draft.push(payload);
          break;
        default:
          break;
      }
    });
    initSocket.on(event, handleEvent);
  } catch (e) {
    console.error(e);
  }
  await cacheEntryRemoved;
  initSocket.off(event);
};

export const chatApi = createApi({
  reducerPath: 'chatApi',
  tagTypes: ['Channel', 'Message'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: apiPath,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
      providesTags: ['Channel'],
    }),
    getMessages: builder.query({
      query: () => 'messages',
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        addSocketListener(
          socket,
          'newMessage',
          cacheDataLoaded,
          updateCachedData,
          cacheEntryRemoved,
        );
      },
      providesTags: ['Message', 'Channel'],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Message'],
    }),
  })
});

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
} = chatApi;
