import { Button, Container, Row, Spinner, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useEffect, useContext, useState } from 'react';
import { useAddNewUserMutation } from '../store/api/chatApi';
import AuthContext from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { registrationValidationSchema } from '../validation.js';

const RegistrationForm = () => {
    const [authError, setAuthError] = useState(false);
    const inputRef = useRef(null);
    const [ addNewUser ] = useAddNewUserMutation();
    const usersList = ['admin']
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const kek = registrationValidationSchema(usersList);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const formik = useFormik({
        validationSchema: kek,
        initialValues: {
            login: '',
            password: '',
            confirmPassword: '',
          },
        onSubmit: async (values) => {
            const { login, password } = values;
            try {
                const response = await addNewUser({ username: login, password: password });
                console.log(response.data);
                const { token, username } = response.data;
                auth.logIn(token, username);
                navigate(routes.mainPagePath);
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
                    <Form.Group>
                        <Form.Label className="form-label" htmlFor="login">Имя пользователя</Form.Label>
                        <InputGroup>
                            <Form.Control 
                            ref={inputRef} 
                            className={`${formik.errors.channelName ? 'is-invalid' : ''}`}
                            type="text" 
                            name="login" 
                            id="login" 
                            onChange={formik.handleChange}
                            value={formik.values.login}
                            autoComplete="true"
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {JSON.stringify(formik.errors)}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label className="form-label" htmlFor="password">Пароль</Form.Label>
                        <InputGroup>
                            <Form.Control 
                            className={`${formik.errors.channelName ? 'is-invalid' : ''}`}
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            autoComplete="new-password"
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors?.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                        <InputGroup>
                            <Form.Control 
                            className={`${formik.errors.channelName ? 'is-invalid' : ''}`}
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            autoComplete="new-password"
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors?.confirmPassword}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
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