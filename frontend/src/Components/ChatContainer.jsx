import ChannelsList from './ChannelsList.jsx';
import MessagesContainer from './MessagesContainer.jsx';
import Modal from './Modals/ModalLayout.jsx';
import { isOpenedSelector } from '../store/slices/modalSlice.js';
import { useSelector } from 'react-redux';
 
const ChatContainer = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelsList />
      <MessagesContainer />
    </div>
  </div>
);

export default ChatContainer;