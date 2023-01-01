import { useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, closeByClick }) {
  const avatarRef = useRef();
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
      setIsInputValid(true);
      setErrorMessage('');
    }
  }, [isOpen]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения рефа
    onUpdateAvatar(avatarRef.current.value);
  }

  // Обработчик изменения инпута
  function handleInput() {
    setIsInputValid(avatarRef.current.validity.valid);
    setErrorMessage(avatarRef.current.validationMessage);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      closeByClick={closeByClick}
      isAllInputValid={isInputValid}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          onInput={handleInput}
          required
          type="url"
          name="link"
          id="avatar-address-input"
          className={
            isInputValid
              ? 'popup__input popup__input_avatar_address'
              : 'popup__input popup__input_avatar_address popup__input_type_error'
          }
          placeholder="Ссылка на аватар"
        />
        <span
          className={
            isInputValid
              ? 'popup__error avatar-address-input-error'
              : 'popup__error avatar-address-input-error popup__error_visible'
          }
        >
          {errorMessage}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
