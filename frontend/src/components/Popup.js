import React from 'react';

function Popup({name, isOpen, onClose, children}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
        <button type="button" className="popup__icon-close" onClick={onClose}></button>
        <div className="popup__wrapper" >
          {children}
        </div>
      </div>
    </section>
  );
}

export default Popup;