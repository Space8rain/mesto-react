import React from 'react'
import PopupWithForm from './PopupWithForm'


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarInput = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
  
    onUpdateAvatar({
      avatar: avatarInput.current.value/* Значение инпута, полученное с помощью рефа */
    })
  }

  function resetInput() {
    avatarInput.current.value = ''
  }

  React.useEffect(() => {
    resetInput()
  }, [isOpen])


  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name='avatar'
      title='Обновить аватар'
      formName='form_type_avatar'
      buttonText='Сохранить'
      > 
      <div className="popup__input-container">
        <input
          required type="url"
          className="popup__input"
          name="link" id="avatarlink"
          placeholder="Ссылка на аватар"
          ref={avatarInput}
        />
        <span className="avatarlink-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup