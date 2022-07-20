import React from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';

function Nav({userEmail, resetLoggedIn}) {

  const history = useHistory();
  const signOut = () => {
    localStorage.removeItem('user');
    resetLoggedIn();
    history.push('/sign-in');
  }

  return (
    <nav className="nav">
      <Switch>
        <Route exact path="/">
          <p className="nav__user-email">{userEmail}</p>
          <Link to="/sign-in" className="nav__link" onClick={signOut}>Выйти</Link>
        </Route>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="nav__link">Регистрация</Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="nav__link">Войти</Link>
        </Route>        
      </Switch>
    </nav>
  );
}

export default Nav;