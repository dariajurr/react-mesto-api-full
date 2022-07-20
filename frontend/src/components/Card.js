import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {    
    props.onCardClick(props.card);
  } 

  function handleLikeClick () {
    props.onCardLike(props.card);
  }

  function handleDeleteClick () {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      { currentUser._id === props.card.owner && <button type="button" className="element__delete" onClick={handleDeleteClick}></button>}
      <img className="element__img" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
          <button type="button" onClick={handleLikeClick} className={`element__icon ${props.card.likes.some(i => i === currentUser._id) && 'element__icon-active'}`}></button>
          <p className="element__likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
