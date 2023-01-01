import AuthElement from './AuthElement';

function Login({ handleLogin, loggedIn }) {
  return (
    <AuthElement
      title={'Вход'}
      btnTitle={'Войти'}
      isRegister={false}
      handleLogin={handleLogin}
      loggedIn={loggedIn}
    />
  );
}

export default Login;
