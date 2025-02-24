import Plus from '../assets/Plus.svg?react';
import { useGetChannelsQuery } from "../store/api/chatApi.js";

const ChannelsList = () => {
  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  const chats = data;
  console.log(data);
  console.log("Error: " + JSON.stringify(error));

  return(
      <div>
          <div>
            <div>
              <b>Каналы</b>
              <Plus />
            </div>
            <ul className="channels-container">
              { chats?.map((chat) => {
                  return(
                    <li>
                      <button type="button">
                        <span>#</span>
                        {chat.name}
                      </button>
                    </li>
                  );
                }) 
              }
            </ul>
          </div>
          <div>
              тут будут сообщения
          </div>
      </div>
  );
}

export default ChannelsList;