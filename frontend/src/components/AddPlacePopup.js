import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const title = React.useRef('');
  const link = React.useRef('');

  React.useEffect(() => {
    title.current.value='';
    link.current.value='';
  }, [isOpen]); 

  function handleSubmit  (e) {    
    e.preventDefault();

    onAddPlace(
      {
        name: title.current.value,
        link: link.current.value,
      }
    )
  }

    return (
        <PopupWithForm title="Новое место" name="element" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Создать'>
          <div className="popup__input-span-group">
              <input
                ref={title}                
                id="input-title"
                type="text"
                name="name"
                className="popup__input popup__input_val_title"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="input-title-error popup__input-error">&nbsp;</span>
            </div>
            <div className="popup__input-span-group">
              <input
                ref={link}
                id="input-link"
                type="url"
                name="link"
                className="popup__input popup__input_val_link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="input-link-error popup__input-error">&nbsp;</span>
            </div>
        </PopupWithForm>
    )
 }

export default AddPlacePopup;