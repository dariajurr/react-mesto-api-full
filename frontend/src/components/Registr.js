import React from 'react';
import AuthForm from './AuthForm';

function Registr({onSubmit}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    };

    function handleChangePassword(e) {
        setPassword(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault()        
        onSubmit(password, email);
    };

    return (
        <AuthForm 
            email={email}
            password={password}
            name='registration'
            title='Регистрация' 
            textBtn='Зарегистрироваться' 
            onSubmit={handleSubmit} 
            onChangeEmail={handleChangeEmail} 
            onChangePassword={handleChangePassword}
        >
            <a className='authForm__subtitle' href='/sign-in'>Уже зарегистрированы? Войти</a>
        </AuthForm>   
    )
}

export default Registr;