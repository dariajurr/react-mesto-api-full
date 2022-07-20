import React, {useEffect} from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Main from './Main'
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Registr from './Registr';
import auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';


function App() {
  const history = useHistory();
  const [currentUser, getUserInfo] =  React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); 
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({}); 
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [infoTooltip, setInfoTooltip] = React.useState({
    isOpen:false, 
    status:false
});

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([res, data]) => {
        getUserInfo(res);
        setCards(data);
      })
    .catch((err) => console.log(err)); 
    }
  }, [loggedIn]);

  useEffect(() => {
    const tokenCheck = () => {
      const JWT = localStorage.getItem('user');
      if (JWT) {    
        auth.valid(JSON.parse(JWT).token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setUserEmail(res.email);
              history.push('/');
            }
          })
          .catch((err) => console.error(err));
      }
    };
    tokenCheck();
  }, [history, loggedIn]);

  function handleEditAvatarClick () {
     setIsEditAvatarPopupOpen(true);
  }

   function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

   function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick (card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setInfoTooltip({isOpen:false});
  }

  function handleUpdateUser(data) {
    api.setProfileInfo(data)
      .then(res => {
        getUserInfo(res);
        closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then(res => {
        getUserInfo(res);
        closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    api.deleteCard(selectedCard._id)
    .then(() => {
      setCards(cards.filter(card => card._id !== selectedCard._id));
      closeAllPopups();
    })
    .catch((err) => console.log(err));  
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(console.log);
  } 

  function handleAddPlaceSubmit(newCard) {
    api.setCard(newCard)
    .then((res) => {      
      setCards([res, ...cards]);
      closeAllPopups(); 
    })
    .catch(console.log);
  }

  function signUp (password, email) {
    auth.signup(password, email)
    .then((res) => {  
      if (res) {
        setInfoTooltip({isOpen: true, status: true});
        history.push('/sign-in');
      } else {
        setInfoTooltip({isOpen: true, status: false});
      } 
    })
    .catch((err) => {
      console.log(err)
    });
  };

  function signIn (password, email) {
    auth.signin(password, email)
    .then(res => {  
      localStorage.setItem('user', JSON.stringify({
        token: res.token
      }));   
      setLoggedIn(true);  
      setUserEmail(email);
      history.push('/');
    })
    .catch((err) => {
      setInfoTooltip({isOpen: true, status: false});
      console.log(err)
    });
  }

  function signOut () {
    setLoggedIn(false);
    history.push('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">      
        <Header userEmail = {userEmail} resetLoggedIn={signOut}/>
        <Switch> 
          <ProtectedRoute 
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick}
            cards={cards} 
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />   

          <Route path="/sign-in">          
            <Login onSubmit={signIn}/>          
          </Route>

          <Route path="/sign-up">          
            <Registr onSubmit={signUp}/>
          </Route> 
 
          <Route path="/">{loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}</Route> 
            
        </Switch>            
        {loggedIn&&<Footer/>}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete}/>
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip onClose={closeAllPopups} data={infoTooltip}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
