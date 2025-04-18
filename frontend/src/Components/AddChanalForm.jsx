import React from 'react';
import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Container, Row, Spinner, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../store/slices/activeChannelSlice';
import { closeModal } from '../store/slices/modalSlice';

// import { useGetChannelsQuery } from '../store/api/chatApi';
import { useAddChannelMutation } from '../store/api/chatApi';

const AddChannelForm = () => {
    const inputRef = useRef(null);
    const [ addChannel ] = useAddChannelMutation();
    // const { isLoading } = useGetChannelsQuery();
    const dispatch = useDispatch();
  
    useEffect(() => {
        inputRef.current.focus();
    }, []);
  
    const formik = useFormik({
      initialValues: { channelName: '' },
      onSubmit: async values => {
        const { channelName } = values;
        values.channelName = '';
        const token = localStorage.getItem('token');
        try {
          const newChannel = { name: channelName, };
          const { data: activeChannel } = await addChannel(newChannel);
          formik.values.channelName = '';
          dispatch(setActiveChannel(activeChannel));
          dispatch(closeModal());

        } catch (error) {
            console.log(error);
        }
      },
    });
  
    return (
        <Container>
          <Form onSubmit={formik.handleSubmit}>
            <Row className='mb-3'>
              <Form.Control 
                ref={inputRef} 
                type="text" 
                name="channelName" 
                id="channelName" 
                onChange={formik.handleChange}
                value={formik.values.channelName}
              />
            </Row>
              {/* <p className='text-danger'>{authError ? 'Неверный логин или пароль' : '\u00A0'}</p> */}
            <Row className='mt-3'>
              <Button 
                variant='primary' 
                type="submit" 
                disabled={formik.isSubmitting}>
                {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
              </Button>
            </Row>
          </Form>
        </Container>
    );
}

export default AddChannelForm;