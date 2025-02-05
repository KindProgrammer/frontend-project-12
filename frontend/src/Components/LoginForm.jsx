import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFormik } from 'formik';
import { Button, Container, Row, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes';

const LoginForm = () => {
  const [authError, setAuthError] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
      inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: values => {
      const { login, password } = values;
        axios.post(routes.apiLogin, {
          username: login,
          password: password
        })
        .then((response) => {
          const { token:jwtToken, username:login } = response.data;
          localStorage.setItem(login, {jwtToken: jwtToken});
          navigate('/');
        })
        .catch((error) => {
          setAuthError(true);
          if ( error.isAxiosError && error.response.status === 401) {
            console.log('error 401!');
            inputRef.current.select();
          } else {
            throw error;
          }
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  return (
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row className='mb-3'>
            <Form.Label className="form-label" htmlFor="login">Логин:</Form.Label>
            <Form.Control 
              ref={inputRef} 
              className={authError ? 'is-invalid' : ''} 
              type="text" 
              name="login" 
              id="login" 
              onChange={formik.handleChange}
              value={formik.values.login}
            />
          </Row>
          <Row>
            <Form.Label className="form-label" htmlFor="password">Пароль:</Form.Label>
            <Form.Control 
              className={authError ? 'is-invalid' : ''} 
              type="password" 
              name="password" 
              id="password" 
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Row>
            <p className='text-danger'>{authError ? 'Неверный логин или пароль' : '\u00A0'}</p>
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

export default LoginForm;