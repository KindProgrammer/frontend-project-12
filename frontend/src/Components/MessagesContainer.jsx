import MessagesForm from './MessagesForm.jsx'
import { useGetMessagesQuery } from '../store/api/chatApi.js'
import { useSelector } from 'react-redux'
import { activeChannelSelector } from '../store/slices/activeChannelSlice'
import MessageItem from './MessageItem.jsx'
import { useTranslation } from 'react-i18next'

const MessagesContainer = () => {
  const { data: messages, isLoading } = useGetMessagesQuery()
  const activeChannel = useSelector(activeChannelSelector)
  const currentСhannelMessages = messages?.filter(message => message.channelId === activeChannel.id)
  const count = currentСhannelMessages ? currentСhannelMessages.length : 0
  const username = localStorage.getItem('username')
  const { t } = useTranslation()

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel.name}
            </b>
          </p>
          <span className="text-muted">{t('messagesContainer.messages.messages', { count: count })}</span>
        </div>
        <div className="overflow-auto px-5 ">
          {currentСhannelMessages?.map((message) => {
            return (
              <MessageItem key={message.id} username={message.username} message={message.message.message} />
            )
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
  )
}

export default MessagesContainer
