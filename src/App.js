import './styles/index.scss'
import { useAuth } from './hooks/useAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './router';
import Header from './components/Header';
import uniqid from 'uniqid'
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { LoginPopupContext } from './context';
import LoginPopup from './components/LoginPopup';
import { getAuth } from 'firebase/auth';
import ProfileEdit from './pages/ProfileEdit';

function App() {
  const [loginPopup, setLoginPopup] = useState(false)
  const currentUser = getAuth();
  
  
  return (
    <div className="App" onClick={() => setLoginPopup(false)}>
      <LoginPopupContext.Provider value={setLoginPopup} >
        <BrowserRouter>
          <Routes>
            {currentUser
              ? <Route path='/' element={<Home />}  />
              : <Route path='/' element={<SignIn />}  />}
            {currentUser && <Route path='/accounts/edit' element={<ProfileEdit />}  />}
            {routes.map(route => <Route path={route.path} element={route.component} key={uniqid()} />)}
          </Routes>
          {!currentUser && <LoginPopup loginPopup={loginPopup} setLoginPopup={setLoginPopup} />}
        </BrowserRouter>
      </LoginPopupContext.Provider>
    </div>
  );
}

export default App;
