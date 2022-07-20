import React from 'react';
import logo from '../images/logo.svg';
import Nav from './Nav';

function Header({userEmail, resetLoggedIn}) {
  return (
      <header className="header">
      <a href="/" className="header__link">
        <img
          src={logo}
          alt="Логотип Mesto Russia"
          className="header__logo"
        />
      </a>
      <Nav userEmail={userEmail} resetLoggedIn={resetLoggedIn}/>
    </header>
  );
}

export default Header;

