import React from 'react'

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button type="button"
        className="popup__btn-close popup__btn-close_type_card button"
        aria-label="кнопка закрытия всплывающего окна"
        onClick={props.onClose}></button>
        <div className="popup__content">
          <h3 className="popup__title">{props.title}</h3>
          <form className={`form ${props.formName} popup__form`} name={`${props.name}`} noValidate>
            {props.children}
            <button type="submit"
            className="popup__btn-save popup__btn-save_type_card"
            aria-label="кнопка сохранения новой карточки">{props.buttonText}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopupWithForm