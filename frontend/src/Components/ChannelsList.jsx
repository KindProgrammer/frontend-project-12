import Plus from '../assets/Plus.svg?react';
import { useGetChannelsQuery } from "../store/api/chatApi.js";

const ChannelsList = () => {
  const { data: channels, error, isLoading, refetch } = useGetChannelsQuery();
  console.log(channels);
  console.log("Error: " + JSON.stringify(error));

  return(
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <button type="button" className="p-1 btn-sm btn btn-outline-primary d-flex align-items-center">
          <Plus />
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <button type="button" className='w-100 rounded-0 text-start btn'>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChannelsList;