import RegistrationForm from "../Components/RegistrationForm";

const Registration = () => {
    return(
        <div className='d-flex justify-content-center align-items-center h-100'>
        <div className='form-container'>
          <h1 className='form-title'>Регистрация</h1>
          <RegistrationForm />
        </div>
      </div>
    );
}

export default Registration;