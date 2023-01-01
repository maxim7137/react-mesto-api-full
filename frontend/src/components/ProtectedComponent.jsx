import Main from './Main';

// Защищенный компонент
function ProtectedComponent({
  handleCardClick,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  cards,
  handleLike,
  handleDeletePopupClick,
}) {
  return (
    <Main
      onHandleCardClick={handleCardClick}
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      cards={cards}
      onCardLike={handleLike}
      onCardDelete={handleDeletePopupClick}
    />
  );
}

export default ProtectedComponent;
