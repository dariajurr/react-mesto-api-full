import React from 'react';

function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__icon-close" onClick={props.onClose}></button>
        <img
          className="popup__img"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;