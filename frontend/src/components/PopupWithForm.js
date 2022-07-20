import React from 'react';
import Popup from './Popup';

function PopupWithForm({title, name, isOpen, onClose, onSubmit, buttonText, children}) {
  return (
      <Popup name={name} isOpen={isOpen} onClose={onClose}>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__btn">{buttonText}</button>
        </form>      
      </Popup>
  );
}

export default PopupWithForm;