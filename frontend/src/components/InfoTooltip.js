import React from 'react';
import Popup from './Popup';
import imgStatusOk from '../images/infoTooltip-ok.png';
import imgStatusErr from '../images/infoTooltip-err.png';

function InfoTooltip({onClose, data}) {
    const title = data.status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
    return (
        <Popup name="infoTooltip" isOpen={data.isOpen} onClose={onClose}>
            <img src={data.status ? imgStatusOk : imgStatusErr} className='popup__status-img' alt={title}/>
            <h2 className="popup__title popup__title_align_center popup__title_no-inputs">{title}</h2>
        </Popup>
    );
}

export default InfoTooltip;