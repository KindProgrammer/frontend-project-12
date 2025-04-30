import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useAddMessageMutation, useGetMessagesQuery } from '../store/api/chatApi'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'

const MessagesForm = (props) => {
  const [addMessage] = useAddMessageMutation()
  const { isLoading } = useGetMessagesQuery()
  const messageFormField = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    messageFormField.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (message) => {
      try {
        message.message = filter.clean(message.message)
        const newMessage = { message, channelId: props.channelId, username: props.username }
        await addMessage(newMessage)
        formik.values.message = ''
        messageFormField.current.focus()
      }
      catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          ref={messageFormField}
          name="message"
          id="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          aria-label={t('messagesForm.ariaLabel')}
          placeholder={t('messagesForm.placeholder')}
          className="border-0 p-0 ps-2 form-control"
        />
        <button type="submit" disabled={!formik.values.message || isLoading} className="btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
          </svg>
          <span className="visually-hidden">{t('messagesForm.submitBtn')}</span>
        </button>
      </div>
    </form>
  )
}

export default MessagesForm
