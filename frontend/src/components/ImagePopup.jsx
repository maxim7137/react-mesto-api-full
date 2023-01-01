import close from '../images/close.svg';

function ImagePopup({ isOpen, onClose, card, closeByClick }) {
  return (
    <div className={`popup popup_image ${isOpen ? 'popup_opened' : ''}`} onClick={closeByClick}>
      <figure className="popup__container">
        <button
          onClick={onClose}
          className="popup__close-button cross"
          type="button"
          aria-label="закрыть"
        >
          <img
            src={close}
            alt="Крест"
            className="popup__close-button-img cross__img"
          />
        </button>
        <img className="popup__img" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
