import Plus from '../assets/Plus.svg?react';
import { useGetChannelsQuery } from "../store/api/chatApi.js";

const ChannelsList = () => {
  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  const chats = data;
  console.log(data);
  console.log("Error: " + JSON.stringify(error));

  return(
      <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
          <div>
            <div>
              <b>Каналы</b>
              <Plus />
            </div>
            <ul className="channels-container">
              { chats?.map((chat) => {
                  return(
                    <li key={chat.id}>
                      <button type="button">
                        <span className='me-1'>#</span>
                        {chat.name}
                      </button>
                    </li>
                  );
                }) 
              }
            </ul>
          </div>
      </div>
  );
}

export default ChannelsList;