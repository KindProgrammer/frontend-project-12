import Plus from '../assets/Plus.svg?react';
import { useGetChannelsQuery } from "../store/api/chatApi.js";
import { setActiveChannel } from '../store/slices/activeChannelSlice.js';
import { activeChannelSelector } from '../store/slices/activeChannelSlice.js';
import { openModal } from '../store/slices/modalSlice.js'; 
import { useSelector, useDispatch } from 'react-redux';
import ChannelControlsButton from './ChannelControlsButton.jsx';

const ChannelsList = () => {
  const { data: channels, error, isLoading } = useGetChannelsQuery();
  const activeChannel = useSelector(activeChannelSelector);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal("addChannelModal"));
  }

  const handleClick = (channel) => {
    dispatch(setActiveChannel(channel));
  }

  return(
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <button onClick={handleOpenModal} type="button" className="p-1 btn-sm btn btn-outline-primary d-flex align-items-center">
          <Plus />
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => {
          return (
          <li className="nav-item w-100" key={channel.id}>
            {/* <button 
              onClick={() => {dispatch(setActiveChannel(channel))}} 
              type="button" 
              className={`w-100 rounded-0 text-start btn ${activeChannel.id === channel.id ? 'btn-secondary' : ''}`}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button> */}
            <ChannelControlsButton channel={channel} activeChannel={activeChannel} handleClick={handleClick} />
          </li>
        )})}
      </ul>
    </div>
  );
}

export default ChannelsList;