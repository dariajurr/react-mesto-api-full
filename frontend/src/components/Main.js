import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (    
    <>
      <section className="profile">
        <div className="profile__avatar-group">
          <img
            src={currentUser.avatar}
            className="profile__img"
            alt="Жак-Ив Кусто"
            onClick={onEditAvatar}
          />
          <button type="button" className="profile__avatar-btn" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="profile__edit-btn" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>
      <section className="elements">        
        {cards.map((card) => (          
          <Card card={card} userID={currentUser._id} onCardClick={onCardClick} key={card._id} onCardLike={onCardLike} onCardDelete={onCardDelete}/>          
        ))}
      </section>
    </>
  );
}

export default Main;


