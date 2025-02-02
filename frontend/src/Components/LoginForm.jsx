import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Row } from 'react-bootstrap';

const LoginForm = () => {

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
    {({ isSubmitting }) => (
      <Container>
        <Form>
          <Row>
            <label  className="form-label" htmlFor="login">Login</label>
            <Field type="text" name="login" id="login" />
            <ErrorMessage name="text" component="div" />
          </Row>
          <Row>
            <label className="form-label" htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" />
          </Row>
          <Row>
            <Button variant='primary' type="submit" disabled={isSubmitting}>Submit</Button>
          </Row>
        </Form>
      </Container>
    )}
    </Formik>
  );
}

export default LoginForm;