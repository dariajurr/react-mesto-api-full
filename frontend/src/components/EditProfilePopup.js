import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name , setName] = React.useState('Жак-Ив Кусто');
    const [description, setDescription ] = React.useState('Исследователь океана');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="profile" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
          <div className="popup__input-span-group">
              <input
                value={name || ''} 
                onChange={handleChangeName}
                id="input-name"
                type="text"
                name="name"
                className="popup__input popup__input_val_name"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="input-name-error popup__input-error">&nbsp;</span>
            </div>
            <div className="popup__input-span-group">
              <input
                value={description || ''} 
                onChange={handleChangeDescription}
                id="input-job"
                type="text"
                name="about"
                className="popup__input popup__input_val_job"
                minLength="2"
                maxLength="200"
                required
              />
              <span className="input-job-error popup__input-error">&nbsp;</span>
            </div>
          </PopupWithForm>
    )
};

export default EditProfilePopup;