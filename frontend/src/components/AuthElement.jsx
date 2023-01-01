import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

function AuthElement({
  title,
  btnTitle,
  isRegister,
  handleLogin,
  handleRegister,
  loggedIn,
}) {
  const [inputData, setInputData] = useState({ password: '', email: '' });

  // Стейты для валидации
  const [isInputValid, setIsInputValid] = useState({
    password: true,
    email: true,
  });
  const [errorMessage, setErrorMessage] = useState({ password: '', email: '' });

  // Обработчик изменения инпута для валидации
  function handleInput(e) {
    const { name, validity, validationMessage } = e.target;
    setIsInputValid({
      ...isInputValid,
      [name]: validity.valid,
    });
    setErrorMessage({
      ...errorMessage,
      [name]: validationMessage,
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isRegister) {
      handleRegister(inputData.email, inputData.password, inputData.email);
    } else {
      handleLogin(inputData.email, inputData.password);
    }
    // return <>{loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}</>;
  }

  if (loggedIn) {
    return <>{loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}</>;
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">{title}</h2>
      <form onSubmit={handleSubmit} name="auth" className="auth__form">
        <label className="auth__field">
          <input
            onChange={handleChange}
            value={inputData.email || ''}
            onInput={handleInput}
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            className={
              isInputValid.email
                ? 'auth__input'
                : 'auth__input auth__input_error'
            }
          />
          <span className="auth__error email-error">{errorMessage.email}</span>
        </label>
        <label className="auth__field">
          <input
            onChange={handleChange}
            value={inputData.password || ''}
            onInput={handleInput}
            required
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            minLength="6"
            maxLength="30"
            className={
              isInputValid.password
                ? 'auth__input'
                : 'auth__input auth__input_error'
            }
          />
          <span className="auth__error password-error">
            {errorMessage.password}
          </span>
        </label>
        <button type="submit" className="auth__button" aria-label={btnTitle}>
          {btnTitle}
        </button>
      </form>
      {title === 'Регистрация' && (
        <p className="auth__caption">
          Уже зарегистрированы?{' '}
          <Link to="/login" className="auth__link">
            Войти
          </Link>
        </p>
      )}
    </div>
  );
}

export default AuthElement;
