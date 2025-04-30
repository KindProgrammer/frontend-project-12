import { Button, Container, Row, Spinner, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useEffect, useState, useContext } from 'react';
import { useAddNewUserMutation } from '../store/api/chatApi';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { registrationValidationSchema } from '../validation.js';
import AuthContext from '../context/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
    const inputRef = useRef(null);
    const [ addNewUser ] = useAddNewUserMutation();
    const [ isError, setIsError ] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { t } = useTranslation();

    const validationSchema = registrationValidationSchema(t);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const formik = useFormik({
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        initialValues: {
            login: '',
            password: '',
            confirmPassword: '',
          },
        onSubmit: async (values) => {
            const { login, password } = values;
            try {
                const response = await addNewUser({ username: login, password: password });
                if (response?.error?.status === 409) {
                    toast.error(t('toasts.error.commonError'));
                    setIsError(true);
                    return;
                };
                const { token, username } = response.data;
                auth.logIn(token, username);
                setIsError(false);
                navigate(routes.mainPagePath);
            } catch (error) {
                setIsError(false);
                if ( error.isAxiosError && error.response.status === 401) {
                  console.log('error 401!');
                  toast.error(t('toasts.error.authError'));
                  inputRef.current.select();
                } else {
                    toast.error(t('toasts.error.commonError'));
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
                        <Form.Label className="form-label" htmlFor="password">{t('registrationForm.userName')}</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                ref={inputRef} 
                                type="text" 
                                name="login" 
                                id="login"
                                onChange={formik.handleChange}
                                value={formik.values.login}
                                className={`${formik.errors.login ? 'is-invalid' : ''}`}
                                autoComplete="true"
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors?.login}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <Form.Group>
                        <Form.Label className="form-label" htmlFor="password">{t('registrationForm.password')}</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type="password" 
                                name="password" 
                                id="password" 
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className={`${formik.errors.password ? 'is-invalid' : ''}`}
                                autoComplete="new-password"
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors?.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <Form.Group>
                        <Form.Label className="form-label" htmlFor="password">{t('registrationForm.confirmPassword')}</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type="password" 
                                name="confirmPassword" 
                                id="confirmPassword" 
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                className={`${formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                                autoComplete="new-password"
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors?.confirmPassword}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <p className='text-danger'>{isError ? t('registrationForm.errors.userExists') : ''}</p>
                <Row className='mt-3'>
                    <Form.Group>
                        <Button
                        variant='primary' 
                        type="submit" 
                        disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : t('registrationForm.submitBtn')}
                        </Button>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    );
}

export default RegistrationForm;