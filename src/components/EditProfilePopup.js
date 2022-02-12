import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  } 

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name='profile'
      title='Редактировать профиль'
      formName='form_type_profile'
      buttonText='Сохранить'
      >
      <div className="popup__input-container">
        <input 
          required minLength="2"
          maxLength="40"
          type="text"
          className="popup__input popup__input_type_name"
          name="profileName" id="newName"
          placeholder="Имя"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="newName-error popup__input-error">{name}</span>
      </div>

      <div className="popup__input-container">
        <input
          required minLength="2"
          maxLength="200"
          type="text"
          className="popup__input"
          name="profileActivity"
          id="newActivity"
          placeholder="Деятельность"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="newActivity-error popup__input-error">{description}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup