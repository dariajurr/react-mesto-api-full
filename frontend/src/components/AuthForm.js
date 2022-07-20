import React from 'react';

function AuthForm({email, password, name, title, textBtn, children, onSubmit, onChangeEmail, onChangePassword}) {
    return (
        <section className='authForm'>
            <div className='authForm__container'>
                <h2 className='authForm__title'>{title}</h2> 
                <form className="authForm__form" name={`${name}`} onSubmit={onSubmit}>
                    <div className='authForm__inputs'>
                        <input    
                        id="input-authForm-email"
                        type='email'
                        name="email"
                        className="authForm__input"
                        placeholder="Email" 
                        onChange={onChangeEmail}                       
                        required
                        />
                        <input 
                        id="input-authForm-password"
                        type="password"
                        name="avatar"
                        className="authForm__input"
                        placeholder="Пароль"
                        onChange={onChangePassword}
                        required
                        />
                    </div>  
                <button type="submit" className="authForm__btn">{textBtn}</button>
                </form>                  
                {children}    
            </div>
        </section>        
    )
}
export default AuthForm;