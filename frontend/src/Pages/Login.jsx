import LoginForm from '../Components/LoginForm.jsx'
import routes from '../routes.js'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { t } = useTranslation()

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="form-container">
        <h1 className="form-title">{t('loginPage.title')}</h1>
        <LoginForm />
        <div className="form-footer mt-3">
          <span>{t('loginPage.text')}</span>
          {' '}
          <a href={routes.registrationPagePath}>{t('loginPage.linkText')}</a>
        </div>
      </div>
    </div>
  )
}

export default Login
