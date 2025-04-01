import MessagesForm from "./MessagesForm.jsx";
import { useGetMessagesQuery } from "../store/api/chatApi.js";
import { useSelector, useDispatch } from 'react-redux';
import { activeChannelSelector } from '../store/slices/activeChannelSlice';
import MessageItem from "./MessageItem.jsx";

const MessagesContainer = () => {
    const { data: messages, error, isLoading, refetch } = useGetMessagesQuery();
    const activeChannel = useSelector(activeChannelSelector);
    const currentСhannelMessages = messages?.filter((message) => message.channelId === activeChannel.id);
    const count = currentСhannelMessages ? currentСhannelMessages.length : 0
    const username = localStorage.getItem('username');

    return(
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b># {activeChannel.name}</b>
                    </p>
                    <span className="text-muted">{count} сообщений</span>
                </div>
                <div className="overflow-auto px-5 ">
                    {currentСhannelMessages?.map((message) => {
                        return(
                            <MessageItem key={message.id} username={message.username} message={message.message.message}/>
                        );
                    })}
                </div>
                <div className="mt-auto px-5 py-3">
                    <MessagesForm 
                        channelId={activeChannel.id}
                        username={username}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}

export default MessagesContainer;