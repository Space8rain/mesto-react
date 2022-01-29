import React from 'react'

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_is-opened'}`}>
      <figure className="popup__full-image">
        <button 
          type="button"
          className="popup__btn-close button popup__btn-close_type_full-image"
          aria-label="Кнопка закрытия картинки"
          onClick={props.onClose}></button>
        <img className="popup__photo" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  )
}

      export default ImagePopup