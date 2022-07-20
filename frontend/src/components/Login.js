import React from 'react';
import AuthForm from './AuthForm';

function Login({onSubmit}) {
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
            name='login' 
            title='Вход' 
            textBtn='Войти' 
            onSubmit={handleSubmit} 
            onChangeEmail={handleChangeEmail} 
            onChangePassword={handleChangePassword}
        />

    )
}
export default Login;