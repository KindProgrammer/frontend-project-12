import React from 'react';
import LoginForm from '../Components/LoginForm.jsx';

const Login = () => {
  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='form-container'>
        <h1 className='form-title'>Войти</h1>
        <LoginForm />
        <div className='form-footer mt-3'>
          <span>Нет аккаунта?</span><a href="#">Регистрация</a>
        </div>
      </div>
    </div>
  );
}

export default Login;