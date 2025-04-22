import { Button, Container, Row, Spinner, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useEffect, useContext, useState } from 'react';
import { useAddNewUserMutation } from '../store/api/chatApi';
import AuthContext from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [authError, setAuthError] = useState(false);
    const inputRef = useRef(null);
    const [ addNewUser ] = useAddNewUserMutation();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
          },
        onSubmit: async (values) => {
            const { username, password } = values;
            try {
                const response = await addNewUser({ username: username, password: password });
                console.log(response.data);
                // const { token:jwtToken, username:login } = response.data;
                // auth.logIn(jwtToken, login);
                // navigate(routes.mainPagePath);
            } catch (error) {
                setAuthError(true);
                if ( error.isAxiosError && error.response.status === 401) {
                  console.log('error 401!');
                  inputRef.current.select();
                } else {
                  throw error;
                }
            }
        }
    })

    return(
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                <Row className='mb-3'>
                    <Form.Label className="form-label" htmlFor="login">Имя пользователя</Form.Label>
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
                    <Form.Label className="form-label" htmlFor="password">Пароль</Form.Label>
                    <Form.Control 
                    className={authError ? 'is-invalid' : ''} 
                    type="password" 
                    name="password" 
                    id="password" 
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    />
            </Row>
            <Row>
                    <Form.Label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                    <Form.Control 
                    className={authError ? 'is-invalid' : ''} 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    />
            </Row>
            <Row className='mt-3'>
                <Button 
                variant='primary' 
                type="submit" 
                disabled={formik.isSubmitting}>
                {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Зарегистрироваться'}
                </Button>
            </Row>
            </Form>
        </Container>
    );
}

export default RegistrationForm;