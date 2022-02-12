import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <button className="profile__img-edit"
            type="button"
            aria-label="кнопка редактирования аватара"
            onClick={onEditAvatar}>
              <img src={currentUser.avatar} alt="" className="profile__img" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__wrap">
              <h1 className="profile__name">{currentUser.name ?? '...'}</h1>
              <button className="profile__btn-edit button"
              type="button"
              aria-label="кнопка редактирования профиля"
              onClick={onEditProfile}></button>
            </div>
            <p className="profile__activity">{currentUser.about ?? '...'}</p>
          </div>
        </div>
        <button className="button button_type_add"
        type="button"
        aria-label="кнопка добавления фото"
        onClick={onAddPlace}></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />
        ))}
      </section>
    </main>
  )
}

export default Main