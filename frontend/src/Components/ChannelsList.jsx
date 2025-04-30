import React from 'react';
import { useGetChannelsQuery } from "../store/api/chatApi.js";
import { setActiveChannel } from '../store/slices/activeChannelSlice.js';
import { activeChannelSelector } from '../store/slices/activeChannelSlice.js';
import { openModal } from '../store/slices/modalSlice.js'; 
import { useSelector, useDispatch } from 'react-redux';
import ChannelControlsButton from './ChannelControlsButton.jsx';
import { useTranslation } from 'react-i18next';

const ChannelsList = () => {
  const { data: channels } = useGetChannelsQuery();
  const activeChannel = useSelector(activeChannelSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpenModal = () => {
    dispatch(openModal({type: "addChannelModal"}));
  }

  const handleClick = (channel) => {
    dispatch(setActiveChannel(channel));
  }

  return(
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>{t('channelsList.channels')}</b>
        <button onClick={handleOpenModal} type="button" className="p-1 btn-sm btn btn-outline-primary d-flex align-items-center">
          +
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => {
          return (
          <li className="nav-item w-100" key={channel.id}>
            <ChannelControlsButton channel={channel} activeChannel={activeChannel} handleClick={handleClick} />
          </li>
        )})}
      </ul>
    </div>
  );
}

export default ChannelsList;