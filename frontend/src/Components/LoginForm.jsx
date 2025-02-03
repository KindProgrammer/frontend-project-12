import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const submitForm = () => {

  }

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        
        const { login, password } = values;
        axios.post('/api/v1/login', {
          login,
          password
        }).then((response) => {
          console.log(response.data)
        })
      }}
    >
    {({ isSubmitting }) => (
      <Container>
        <Form>
          <Row className='mb-3'>
            <label  className="form-label" htmlFor="login">Login</label>
            <Field className="form-control" type="text" name="login" id="login" />
            <ErrorMessage name="text" component="div" />
          </Row>
          <Row className='mb-3'>
            <label className="form-label" htmlFor="password">Password</label>
            <Field className="form-control" type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" />
          </Row>
          <Row className='mt-3'>
            <Button variant='primary' type="submit" disabled={isSubmitting}>Submit</Button>
          </Row>
        </Form>
      </Container>
    )}
    </Formik>
  );
}

export default LoginForm;