import React from 'react'

function Card({name, link, likes, onCardClick}) {
  
  function handleClick() {
    onCardClick({ name, link });
  }

  return (
    <article className="card">
    <button className="card__delete button" type="button" aria-label="кнопка удаления"></button>
    <img src={link} alt={name} className="card__image" onClick={handleClick}/>
    <div className="card__banner">
      <h2 className="card__title">{name}</h2>
      <div className="card__like-container">
        <button className="card__like" type="button" aria-label="кнопка лайк"></button>
        <p className="card__like-count">{likes}</p>
      </div>
    </div>
    </article>
  )
}

export default Card