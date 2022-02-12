// import './App.css';
import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {

  // Состояние попапа изменения профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  // Состояние попапа добавления карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  // Состояние попапа изменения аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)

  // Выбранная карточка при клике на картинку
  const [selectedCard, setSelectedCard] = React.useState({});

  // Данные текущего пользователя
  const [currentUser, setСurrentUser] = React.useState({});

  // Данные карточек
  const [cards, setCards] = React.useState([])

  // Открыть попап изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  // Открыть попап изменения профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  // Открыть попап добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  // Закрыть все попапы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  // Записать данные выбранной карточки в переменную состояния
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Поставить\убрать лайк карточке
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // Удаление карточки и возвращения массива без нее
  function handleCardDelete(card) {
    api.deleteUserCard(card._id)
      .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // Отправляем новые данные пользователя на сервер
  function handleUpdateUser(data) {
    api.editProfile(data.name, data.about)
      .then((res) => {
        setСurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Отправляем новые данные аватара на сервер
  function handleUpdateAvatar(data) {
    api.changeAvatar(data.avatar)
      .then((res) => {
        setСurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(data){
    api.addUserCard(data.name, data.link)
      .then((card) => {
        setCards([card, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Получаем данные профиля и записываем в активного пользователя при монтировании
  React.useEffect(() => {
    api.getProfile()
      .then((data) => {
        setСurrentUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Получаем карточки с сервера
  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Рендер
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">

        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer/>

        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          /> 

        {/* Попап добавления карточки */}
        <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup 
          name="image"
          isOpen={!!selectedCard.name && !!selectedCard.link}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
