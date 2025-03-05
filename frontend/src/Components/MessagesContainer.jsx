import MessagesForm from "./MessagesForm.jsx";
import { useGetMessagesQuery } from "../store/api/chatApi.js";
import { useSelector } from 'react-redux';
import { activeChannelSelector } from '../store/slices/activeChannelSlice';

const MessagesContainer = () => {
    const { data: messages, error, isLoading, refetch } = useGetMessagesQuery();
    const activeChannel = useSelector(activeChannelSelector);

    return(
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b># general</b>
                    </p>
                    <span className="text-muted">0 сообщений</span>
                </div>
                {messages?.map((message) => {
                    return(
                        <div key={message.id}>
                            {message.body}
                        </div>
                    );
                })}
                <div className="mt-auto px-5 py-3">
                    <MessagesForm 
                        channelId={activeChannel.id}
                        username={"ToDo"}
                    />
                </div>
            </div>
        </div>
    );
}

export default MessagesContainer;