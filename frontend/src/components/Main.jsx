import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import pen from '../images/pen.svg';
import edit from '../images/edit.svg';
import plus from '../images/plus.svg';

function Main({
  onHandleCardClick,
  onCardLike,
  onEditProfile,
  onCardDelete,
  onEditAvatar,
  onAddPlace,
  cards
}) {

  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__cover" onClick={onEditAvatar}>
          <img src={pen} alt="карандаш" className="profile__pen" />
          <img src={avatar} alt="аватар" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__name-edit">
            <h1 className="profile__name">{name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}
            >
              <img
                src={edit}
                alt="карандаш"
                className="profile__edit-button-img"
              />
            </button>
          </div>
          <p className="profile__character">{about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="добавить карточку"
          onClick={onAddPlace}
        >
          <img src={plus} alt="плюс" className="profile__add-button-img" />
        </button>
      </section>
      <ul className="elements">
        {cards.map(card => (
          <Card
            key={card._id}
            onCardClick={onHandleCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            card={card}
            {...card}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
