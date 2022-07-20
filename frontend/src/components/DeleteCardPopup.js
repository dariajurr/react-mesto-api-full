import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.onDelete(
        
        );        
    }

    return (
        <PopupWithForm title="Вы уверены?" name="delete" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Да'/>
    )
}

export default DeleteCardPopup;