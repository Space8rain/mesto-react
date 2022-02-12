import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name,
      link
    })
  }

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])


  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name='card'
      title='Новое место'
      formName='form_type_card'
      buttonText='Создать'
      > 
      <div className="popup__input-container">
          <input
            required
            minLength="2"
            maxLength="30"
            type="text"
            className="popup__input"
            name="name"
            id="placename"
            placeholder="Название"
            onChange={handleNameChange}
            value={name || ''}
          />
          <span className="placename-error"></span>
        </div>

        <div className="popup__input-container">
          <input
            required
            type="url"
            className="popup__input"
            name="link"
            id="imglink"
            placeholder="Ссылка на картинку"
            onChange={handleLinkChange}
            value={link || ''}
          />
          <span className="imglink-error"></span>
        </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup