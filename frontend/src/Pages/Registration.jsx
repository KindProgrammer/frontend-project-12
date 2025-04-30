import React from "react";
import RegistrationForm from "../Components/RegistrationForm";
import { useTranslation } from 'react-i18next';

const Registration = () => {
  const { t } = useTranslation();

  return(
      <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='form-container'>
        <h1 className='form-title'>{t('registrationPage.title')}</h1>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Registration;