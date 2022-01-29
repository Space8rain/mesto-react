import React from 'react'
import api from '../utils/Api'
import Card from './Card'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')

  React.useEffect(() => {
    api.getProfile()
      .then((data) => {
        setUserName(data.name)
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(
          data.map((card) => ({
            id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes.length,
          })))
      })
      .catch((err) => {
        console.log(err)
      })
  })

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <button className="profile__img-edit"
            type="button"
            aria-label="кнопка редактирования аватара"
            onClick={onEditAvatar}>
              <img src={userAvatar} alt="" className="profile__img" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__wrap">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__btn-edit button"
              type="button"
              aria-label="кнопка редактирования профиля"
              onClick={onEditProfile}></button>
            </div>
            <p className="profile__activity">{userDescription}</p>
          </div>
        </div>
        <button className="button button_type_add"
        type="button"
        aria-label="кнопка добавления фото"
        onClick={onAddPlace}></button>
      </section>

      <section className="cards">
        {cards.map(({id, ...props}) => (
          <Card key={id} {...props} onCardClick={onCardClick}/>
        ))}
      </section>
    </main>
  )
}

export default Main