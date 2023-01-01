import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Switch, Route, Redirect, useLocation, Link } from 'react-router-dom';
import { register, authorize, getToken } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/Api';

import ProtectedRoute from './ProtectedRoute';
import ProtectedComponent from './ProtectedComponent';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';

import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

// Мемоизированные компоненты
const MemoizedInfoTooltip = memo(InfoTooltip);
const MemoizedLogin = memo(Login);
const MemoizedRegister = memo(Register);

function App() {
  let location = useLocation();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isResponseOk, setIsResponseOk] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [candidateForRemove, setCandidateForRemove] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userAuthData, setUserAuthData] = useState({
    password: '',
    email: '',
  });

  // <-- Контекст текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Контекст текущего пользователя -->

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function handleDeletePopupClick(card) {
    setCandidateForRemove(card);
    setIsDeletePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }
  // <-- Закрытие попапов
  // По клику на оверлей
  function closeByClick(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }
  // <-- По Escape --
  function closeByEscape(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  // -- По Escape -->
  // Закрытие попапов -->

  // <-- Пользователь
  useEffect(() => {
    if (loggedIn) {
      const jwt = 'Bearer ' + localStorage.getItem('jwt');
      api
        .getInitialUser(jwt)
        .then((result) => {
          setCurrentUser(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
  // Пользователь -->

  // <-- всё, что касается переменной cards --
  // <-- Карточки
  useEffect(() => {
    if (loggedIn) {
      const jwt = 'Bearer ' + localStorage.getItem('jwt');
      api
        .getInitialCards(jwt)
        .then((result) => {
          setCards(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
  // Карточки -->

  // <--Лайки
  function handleLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const jwt = 'Bearer ' + localStorage.getItem('jwt');
    if (isLiked) {
      api
        .dislikeCard(card._id, jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === newCard._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .likeCard(card._id, jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === newCard._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // Лайки-->

  // <-- Удаление
  function handleSubmitDelete(e) {
    e.preventDefault();
    const card = candidateForRemove;
    const jwt = 'Bearer ' + localStorage.getItem('jwt');
    api
      .delCard(card._id, jwt)
      .then(
        setCards((state) =>
          state.filter((stateCard) => stateCard._id !== card._id)
        )
      )
      .then(closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }
  // Удаление -->
  // -- всё, что касается переменной cards -->

  // Обработчик отправки профиля
  function handleUpdateUser(data) {
    const jwt = 'Bearer ' + localStorage.getItem('jwt');
    api
      .setUser(data, jwt)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Обработчик отправки аватара
  function handleUpdateAvatar(link) {
    const jwt = 'Bearer ' + localStorage.getItem('jwt');
    api
      .setAvatar(link, jwt)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Обработчик отправки места
  function handleAddPlaceSubmit(data) {
    const jwt = 'Bearer ' + localStorage.getItem('jwt');
    api
      .setCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        return newCard;
      })
      .then((newCard) => {
        if (newCard) {
          closeAllPopups();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // <-- Обработчик аутентификации
  const authentication = useCallback((data) => {
    localStorage.setItem('jwt', data.token);
    setLoggedIn(true);
    setUserAuthData(data.user);
  }, []);
  // Обработчик аутентификации -->

  // <-- Обработчик успешности авторизации
  const handlePopupCheck = useCallback((isOk) => {
    if (isOk) {
      setIsResponseOk(true);
    } else {
      setIsResponseOk(false);
    }
    setIsInfoTooltipPopupOpen(true);
  }, []);
  // Обработчик успешности авторизации -->

  // <-- Обработчики входа и выхода
  const handleLogin = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        const data = await authorize(email, password);
        if (data.token) {
          authentication(data);
        }
        setUserAuthData({
          password,
          email,
        });
      } catch (error) {
        handlePopupCheck(false);
      } finally {
        setLoading(false);
      }
    },
    [authentication, handlePopupCheck]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserAuthData({
      password: '',
      email: '',
    });
  }, []);
  // Обработчики входа и выхода -->

  // <-- Обработчик регистрации
  const handleRegister = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        const data = await register(email, password);
        if (data.token) {
          authentication(data);
          handlePopupCheck(true);
        }
      } catch (error) {
        handlePopupCheck(false);
      } finally {
        setLoading(false);
      }
    },
    [authentication, handlePopupCheck]
  );
  // Обработчик регистрации -->

  // Проверка токена
  const tokenCheck = useCallback(async () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    try {
      setLoading(true);
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token');
      }
      if (jwt) {
        const user = await getToken(jwt);
        if (!user) {
          throw new Error('no user');
        }
        if (user) {
          setUserAuthData(user);
          setLoggedIn(true);
        }
      }
    } catch (error) {
      console.log('tokenCheck', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, [tokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" ref={ref} tabIndex={-1} onKeyDown={closeByEscape}>
        <div className="container">
          {loading ? (
            <Loading />
          ) : (
            <>
              <Header>
                {location.pathname === '/' && (
                  <span className="header__email">{userAuthData.email}</span>
                )}
                <Link
                  to={
                    (location.pathname === '/login' && '/register') ||
                    (location.pathname === '/register' && '/login') ||
                    (location.pathname === '/' && '/login')
                  }
                >
                  <button
                    className={
                      location.pathname === '/'
                        ? 'header__button header__button_loggedIn'
                        : 'header__button'
                    }
                    onClick={location.pathname === '/' ? handleLogout : null}
                  >
                    {(location.pathname === '/login' && 'Регистрация') ||
                      (location.pathname === '/register' && 'Войти') ||
                      (location.pathname === '/' && 'Выйти')}
                  </button>
                </Link>
              </Header>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  loggedIn={loggedIn}
                  component={ProtectedComponent}
                  userEmail={userAuthData.email}
                  handleLogout={handleLogout}
                  handleCardClick={handleCardClick}
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  cards={cards}
                  handleLike={handleLike}
                  handleDeletePopupClick={handleDeletePopupClick}
                />
                <Route path="/login">
                  <MemoizedLogin
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                  />
                </Route>
                <Route path="/register">
                  <MemoizedRegister
                    handleRegister={handleRegister}
                    loggedIn={loggedIn}
                  />
                </Route>
                <Route path="*">
                  {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
                </Route>
              </Switch>
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                closeByClick={closeByClick}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                closeByClick={closeByClick}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                closeByClick={closeByClick}
              />
              <PopupWithForm
                isOpen={isDeletePopupOpen}
                onClose={closeAllPopups}
                onSubmit={handleSubmitDelete}
                closeByClick={closeByClick}
                isAllInputValid={true}
                name="delete"
                title="Вы уверены?"
                buttonText="Да"
              />
              <ImagePopup
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
                card={selectedCard}
                closeByClick={closeByClick}
              />
              <MemoizedInfoTooltip
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
                isResponseOk={isResponseOk}
                closeByClick={closeByClick}
              />
              <Footer />
            </>
          )}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
