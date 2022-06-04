import './styles/index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './router';
import uniqid from 'uniqid'
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { LoginPopupContext } from './context';
import LoginPopup from './components/LoginPopup';
import ProfileEdit from './pages/ProfileEdit';
import ProfileSaved from './pages/ProfileSaved';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [loginPopup, setLoginPopup] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const changeAuth = () => {
    if (auth.currentUser) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, changeAuth)
  }, [])
  
  return (
    <div className="App" onClick={() => setLoginPopup(false)}>
      <LoginPopupContext.Provider value={setLoginPopup} >
        <BrowserRouter>
          <Routes>
            {isLoggedIn
              ? <Route path='/' element={<Home />}  />
              : <Route path='/' element={<SignIn />}  />}
            {isLoggedIn && <Route path='/accounts/edit/' element={<ProfileEdit />}  />}
            {isLoggedIn && <Route path='/profile/:profile/saved' element={<ProfileSaved />}  />}
            {routes.map(route => <Route path={route.path} element={route.component} key={uniqid()} />)}
          </Routes>
          {!isLoggedIn && <LoginPopup loginPopup={loginPopup} setLoginPopup={setLoginPopup} />}
        </BrowserRouter>
      </LoginPopupContext.Provider>
    </div>
  );
}

export default App;
