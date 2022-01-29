// import './App.css';
import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="App">
      <div className="root">
        <div className="page">

        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer/>

        {/* Попап редактирования профиля */}
        <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name='profile'
        title='Редактировать профиль'
        formName='form_type_profile'
        buttonText='Сохранить'
        > 
        <div className="popup__input-container">
          <input required minLength="2" maxLength="40" type="text" className="popup__input popup__input_type_name" name="profileName" id="newName" placeholder="Имя" />
          <span className="newName-error popup__input-error"></span>
        </div>

        <div className="popup__input-container">
          <input required minLength="2" maxLength="200" type="text" className="popup__input" name="profileActivity" id="newActivity" placeholder="Деятельность" />
          <span className="newActivity-error popup__input-error"></span>
        </div>
        </PopupWithForm>

        {/* Попап редактирования аватара */}
        <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name='avatar'
        title='Обновить аватар'
        formName='form_type_avatar'
        buttonText='Сохранить'
        > 
        <div className="popup__input-container">
          <input required type="url" className="popup__input" name="link" id="avatarlink" placeholder="Ссылка на аватар" />
          <span className="avatarlink-error"></span>
        </div>
        </PopupWithForm>

        {/* Попап добавления карточки */}
        <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name='card'
        title='Новое место'
        formName='form_type_card'
        buttonText='Создать'
        > 
        <div className="popup__input-container">
            <input required minLength="2" maxLength="30" type="text" className="popup__input" name="name" id="placename" placeholder="Название"/>
            <span className="placename-error"></span>
          </div>

          <div className="popup__input-container">
            <input required type="url" className="popup__input" name="link" id="imglink" placeholder="Ссылка на картинку"/>
            <span className="imglink-error"></span>
          </div>
        </PopupWithForm>

        <ImagePopup 
          name="image"
          isOpen={!!selectedCard.name && !!selectedCard.link}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        </div>
      </div>
    </div>
  );
}

export default App;
