import { useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { Button, Container, Row, Spinner, Form, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setActiveChannel } from '../store/slices/activeChannelSlice'
import { closeModal } from '../store/slices/modalSlice'
import { editChannelvalidationSchema } from '../validation'
import { channelSelector } from '../store/slices/modalSlice'
import { activeChannelSelector } from '../store/slices/activeChannelSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { useGetChannelsQuery } from '../store/api/chatApi'
import { useEditChannelMutation } from '../store/api/chatApi'

const EditChannelForm = () => {
  const inputRef = useRef(null)
  const currentChannel = useSelector(channelSelector)
  const activeChannel = useSelector(activeChannelSelector)
  const [editChannel] = useEditChannelMutation()
  const { data: channels } = useGetChannelsQuery()
  const channelsNames = channels.map(item => item.name)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const validationSchema = editChannelvalidationSchema(channelsNames, t)

  useEffect(() => {
    inputRef.current.value = currentChannel.name
    formik.values.channelName = currentChannel.name
    inputRef.current.focus()
    inputRef.current.select()
  }, [])

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: { channelName: '' },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { channelName } = values
      values.channelName = ''
      try {
        const newChannel = { id: currentChannel.id, editChannel: { ...currentChannel, name: channelName } }
        const { data: editedСhannel } = await editChannel(newChannel)
        formik.values.channelName = ''
        if (activeChannel.id === editedСhannel.id) {
          dispatch(setActiveChannel(editedСhannel))
        }
        dispatch(closeModal())
        toast.success(t('toasts.success.channel.rename'))
      }
      catch (error) {
        toast.error(t('toasts.error.commonError'))
        console.log(error)
      }
    },
  })

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="channelName">{t('editChannelForm.channelName')}</Form.Label>
            <InputGroup>
              <Form.Control
                ref={inputRef}
                type="text"
                name="channelName"
                id="channelName"
                onChange={formik.handleChange}
                value={formik.values.channelName}
                className={`${formik.errors.channelName ? 'is-invalid' : ''}`}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors?.channelName}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="d-flex justify-content-end gap-2">
            <Button
              className="btn-secondary"
              onClick={() => { dispatch(closeModal()) }}
            >
              {t('editChannelForm.cancelBtn')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : t('editChannelForm.submitBtn')}
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  )
}

export default EditChannelForm
