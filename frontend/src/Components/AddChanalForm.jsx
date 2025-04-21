import React from 'react';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Container, Row, Spinner, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../store/slices/activeChannelSlice';
import { closeModal } from '../store/slices/modalSlice';
import { editChannelvalidationSchema } from '../validation';
import { toast } from 'react-toastify';

import { useGetChannelsQuery } from '../store/api/chatApi';
import { useAddChannelMutation } from '../store/api/chatApi';

const AddChannelForm = () => {
    const inputRef = useRef(null);
    const [ addChannel ] = useAddChannelMutation();
    const { data: channels } = useGetChannelsQuery();
    const channelsNames = channels.map((item) => item.name);
    const dispatch = useDispatch();
    const validationSchema = editChannelvalidationSchema(channelsNames);
  
    useEffect(() => {
        inputRef.current.focus();
    }, []);
  
    const formik = useFormik({
      validationSchema: validationSchema,
      initialValues: { channelName: '' },
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async values => {
        const { channelName } = values;
        values.channelName = '';
        try {
          const newChannel = { name: channelName.trim(), };
          const { data: activeChannel } = await addChannel(newChannel);
          formik.values.channelName = '';
          dispatch(setActiveChannel(activeChannel));
          dispatch(closeModal());
          toast.success("Канал создан");
        } catch (error) {
            console.log(error);
        }
      },
    });
  
    return (
        <Container>
          <Form onSubmit={formik.handleSubmit}>
            <Row className='mb-3'>
              <Form.Group>
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
              <Form.Group className='d-flex justify-content-end gap-2'>
                <Button 
                  className='btn-secondary'
                  onClick={() => {dispatch(closeModal())}}
                >
                  Отменить
                </Button>
                <Button
                    variant='primary' 
                    type="submit" 
                    disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Отправить'}
                  </Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
    );
}

export default AddChannelForm;