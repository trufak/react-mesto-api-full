import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext, CurrentUserAuthContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Switch, Route, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  //States
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [statusInfoTooltip, setStatusInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  //Hookes
  //Запрос email о пользователе и карточек
  useEffect(()=>{
    const token = localStorage.getItem('tokenMesto');
    if (token) {
      api.headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
      api.getUser()
      .then (data=>{
        setLoggedIn(true);
        setCurrentUser({...currentUser, email: data.data.email});
        history.push('/');
      })
      .catch(err=>console.log(err));
    }
  },[]);
  //Запрос данных о пользователе и карточек
  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('tokenMesto');
      api.headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser({...currentUser, ...userInfo.data});
        setCards(initialCards.data);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  //Functions and callbacks
  //Обработчик нажатия на кнопку редактирования аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  //Обработчик нажатия на кнопку редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  //Обработчик нажатия на кнопку добавления карточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  //Обработчик нажатия на карточку
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  };
  //Обновление данных пользователя
  const handleUpdateUser = (userData) => {
    api
      .patchUserInfo(userData.name, userData.about)
      .then((userInfo) => {
        setCurrentUser({...currentUser, ...userInfo.data});
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  //Обновление аватара
  const handleUpdateAvatar = (link) => {
    api
      .changeAvatar(link)
      .then((userInfo) => {
        setCurrentUser({...currentUser, ...userInfo.data});
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  //Установка/снятие лайка
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };
  //Открытия popup подтверждения
  const handleCardDelete = (card) => {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  };
  //Удаление карточки
  const handleCardDeleteSubmit = () => {
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  //Добавление карточки
  const handleAddPlaceSubmit = (name, link) => {
    api
      .postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };
  //Закрытие popup
  const closeAllPopups = () => {
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isCardPopupOpen && setIsCardPopupOpen(false);
    isDeleteCardPopupOpen && setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  };
  //Закрытие InfoTooltip
  const closeInfoTooltip = () => {
    isInfoTooltipOpen && setIsInfoTooltipOpen(false);
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  //регистрация пользователя
  const handleRegister = (email, password) => {
    return api.signup(email, password)
    .then(res=>{
      setStatusInfoTooltip(true);
      setIsInfoTooltipOpen(true);
      history.push('/signin');
    })
    .catch(err=>{
      console.log(err);
      setStatusInfoTooltip(false);
      setIsInfoTooltipOpen(true);
    });
  };
  //авторизация пользователя
  const handleLogin = (email, password) => {
    return api.signin(email, password)
    .then(data=>{
      if (data.token) {
        localStorage.setItem('tokenMesto', data.token);
        setCurrentUser({...currentUser, email: email});
        setLoggedIn(true);
        history.push('/');
      } else return Promise.reject();
    })
    .catch(err=> {
      console.log(err);
      setStatusInfoTooltip(false);
      setIsInfoTooltipOpen(true);
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("tokenMesto");
    setLoggedIn(false);
  };

  return (
    <div className="main-page">
      <CurrentUserContext.Provider value={currentUser}>
          <Header onLogOut={handleLogOut} />
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={handleRegister}/>
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin}/>
            </Route>
            <ProtectedRoute path="/" loggedIn={loggedIn}>
              <div>
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                  />
                  <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isCardPopupOpen}
                  />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                  />
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                  />
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                  />
                  <DeleteCardPopup
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDeleteSubmit}
                  />
                  <Footer />
                </div>
            </ProtectedRoute>
          </Switch>
          <InfoTooltip isOpen={isInfoTooltipOpen} status={statusInfoTooltip} onClose={closeInfoTooltip}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
