import { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button, Container, Row, Spinner, Form } from 'react-bootstrap'
import axios from 'axios'
import routes from '../routes'
import AuthContext from '../context/AuthContext.jsx'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const LoginForm = () => {
  const [authError, setAuthError] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { login: '', password: '' },
    onSubmit: (values) => {
      const { login, password } = values
      axios.post(routes.apiLogin, {
        username: login,
        password: password,
      })
        .then((response) => {
          const { token: jwtToken, username: login } = response.data
          auth.logIn(jwtToken, login)
          navigate(routes.mainPagePath)
        })
        .catch((error) => {
          setAuthError(true)
          if (error.isAxiosError && error.response.status === 401) {
            toast.error(t('toasts.error.authError'))
            console.log('error 401!')
            inputRef.current.select()
          }
          else {
            throw error
          }
        })
        .finally(() => {
          formik.setSubmitting(false)
        })
    },
  })

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Label className="form-label" htmlFor="login">
            {t('loginForm.loginLabel')}
            :
          </Form.Label>
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
          <Form.Label className="form-label" htmlFor="password">
            {t('loginForm.passLabel')}
            :
          </Form.Label>
          <Form.Control
            className={authError ? 'is-invalid' : ''}
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Row>
        <p className="text-danger">{authError ? t('loginForm.errors.illegalPassOrLogin') : '\u00A0'}</p>
        <Row className="mt-3">
          <Button
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : t('loginForm.submitBtn')}
          </Button>
        </Row>
      </Form>
    </Container>
  )
}

export default LoginForm
