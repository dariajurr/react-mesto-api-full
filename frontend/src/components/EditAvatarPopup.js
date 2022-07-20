import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      inputRef.current.value = '';
    }, [props.isOpen]); 
    
    function handleSubmit(e) {
      e.preventDefault();
      props.onUpdateAvatar(
        inputRef.current.value,
      );        
    } 

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'> 
                  <div className="popup__input-span-group">
              <input
                ref={inputRef}
                id="input-linkAvatar"
                type="url"
                name="avatar"
                className="popup__input popup__input_val_link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="input-linkAvatar-error popup__input-error">&nbsp;</span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;