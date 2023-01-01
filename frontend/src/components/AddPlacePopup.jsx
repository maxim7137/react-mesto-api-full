import { useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, closeByClick }) {
  const nameRef = useRef();
  const linkRef = useRef();

  const [isInputValid, setIsInputValid] = useState({ name: true, link: true });
  const [errorMessage, setErrorMessage] = useState({ name: '', link: '' });

  useEffect(() => {
    if (isOpen) {
      nameRef.current.value = '';
      linkRef.current.value = '';

      setIsInputValid({ name: true, link: true });
      setErrorMessage({ name: '', link: '' });
    }
  }, [isOpen]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения рефа
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  // Обработчик изменения инпута
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

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      closeByClick={closeByClick}
      isAllInputValid={isInputValid.name && isInputValid.link}
      name="card"
      title="Новое место"
      buttonText="Создать"
    >
      <label className="popup__field">
        <input
          ref={nameRef}
          onInput={handleInput}
          required
          type="text"
          name="name"
          id="card-name-input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          className={
            isInputValid.name
              ? 'popup__input popup__input_card_name'
              : 'popup__input popup__input_card_name popup__input_type_error'
          }
        />
        <span
          className={
            isInputValid.name
              ? 'popup__error card-name-input-error'
              : 'popup__error card-name-input-error popup__error_visible'
          }
        >
          {errorMessage.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          ref={linkRef}
          onInput={handleInput}
          required
          type="url"
          name="link"
          id="card-address-input"
          placeholder="Ссылка на картинку"
          className={
            isInputValid.link
              ? 'popup__input popup__input_card_address'
              : 'popup__input popup__input_card_address popup__input_type_error'
          }
        />
        <span
          className={
            isInputValid.link
              ? 'popup__error card-address-input-error'
              : 'popup__error card-address-input-error popup__error_visible'
          }
        >
          {errorMessage.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
