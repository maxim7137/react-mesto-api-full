import AuthElement from './AuthElement';

function Register({ handlePopupCheck, handleRegister, loggedIn }) {
  return (
    <AuthElement
      title={'Регистрация'}
      btnTitle={'Зарегистрироваться'}
      isRegister={true}
      handlePopupCheck={handlePopupCheck}
      handleRegister={handleRegister}
      loggedIn={loggedIn}
    />
  );
}

export default Register;
