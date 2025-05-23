import { createSlice } from '@reduxjs/toolkit'
import defaultChannel from '../../defaultChannel.js'

const initialState = {
  activeChannel: defaultChannel,
}

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload
    },
  },
})

export const { setActiveChannel } = activeChannelSlice.actions
export const activeChannelSelector = state => state.activeChannel.activeChannel
export default activeChannelSlice.reducer
