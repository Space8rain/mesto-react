import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({onCardClick, onCardLike, onCardDelete, card}) {

  const currentUser = React.useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id

  const isLiked = card.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = (
    `${isLiked ? 'card__like_active' : 'card__like'}`
  )

  function handleClick() {
    onCardClick( card )
  }

  function handleLikeClick() {
    onCardLike( card )
  }

  function handleDeleteClick() {
    onCardDelete( card )
  }

  return (
    <article className="card">
    {isOwn && <button className='card__delete button' type="button" aria-label="кнопка удаления" onClick={handleDeleteClick}></button>}
    <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
    <div className="card__banner">
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like-container">
        <button className={cardLikeButtonClassName} type="button" aria-label="кнопка лайк" onClick={handleLikeClick}></button>
        <p className="card__like-count">{card.likes.length}</p>
      </div>
    </div>
    </article>
  )
}

export default Card