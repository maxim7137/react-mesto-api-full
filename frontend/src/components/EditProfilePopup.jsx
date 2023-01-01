import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, closeByClick }) {
  const user = useContext(CurrentUserContext);
  // Стейты, в которых содержатся значения инпутов
  const [userName, setUserName] = useState(' ');
  const [userDescription, setUserDescription] = useState(' ');
  // Стейты для валидации
  const [isInputValid, setIsInputValid] = useState({ name: true, about: true });
  const [errorMessage, setErrorMessage] = useState({ name: '', about: '' });

  useEffect(() => {
    if (isOpen) {
      setIsInputValid({ name: true, about: true });
      setErrorMessage({ name: '', about: '' });
    }
  }, [isOpen]);

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

  // Обработчик изменения инпута обновляет стейт
  function handleChange(e) {
    if (e.target.name === 'name') {
      setUserName(e.target.value);
    }
    if (e.target.name === 'about') {
      setUserDescription(e.target.value);
    }
  }
  // Обработчик отправки формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: userName,
      about: userDescription,
    });
  }

  useEffect(() => {
    if (user.name) {
      setUserName(user.name);
      setUserDescription(user.about);
    }
  }, [isOpen, user.name, user.about]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      closeByClick={closeByClick}
      isAllInputValid={isInputValid.name && isInputValid.about}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <label className="popup__field">
        <input
          value={userName}
          onChange={handleChange}
          onInput={handleInput}
          required
          type="text"
          name="name"
          id="user-name-input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          className={
            isInputValid.name
              ? 'popup__input popup__input_user_name'
              : 'popup__input popup__input_user_name popup__input_type_error'
          }
        />
        <span
          className={
            isInputValid.name
              ? 'popup__error user-name-input-error'
              : 'popup__error user-name-input-error popup__error_visible'
          }
        >
          {errorMessage.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          value={userDescription}
          onChange={handleChange}
          onInput={handleInput}
          required
          type="text"
          name="about"
          id="user-character-input"
          placeholder="Занятие"
          minLength="2"
          maxLength="200"
          className={
            isInputValid.about
              ? 'popup__input popup__input_user_character'
              : 'popup__input popup__input_user_character popup__input_type_error'
          }
        />
        <span
          className={
            isInputValid.about
              ? 'popup__error user-character-input-error'
              : 'popup__error user-character-input-error popup__error_visible'
          }
        >
          {errorMessage.about}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
