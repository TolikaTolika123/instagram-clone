import './styles/index.scss'
import { useAuth } from './hooks/useAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './router';
import Header from './components/Header';
import uniqid from 'uniqid'
import { useState } from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { LoginPopupContext } from './context';
import { auth } from './firebase';
import LoginPopup from './components/LoginPopup';

function App() {
  const currentUser = useAuth();
  const [loginPopup, setLoginPopup] = useState(false)

  return (
    <div className="App" onClick={() => setLoginPopup(false)}>
      <LoginPopupContext.Provider value={setLoginPopup} >
        <BrowserRouter>
          <Routes>
            {currentUser
              ? <Route path='/' element={<Home />} key={uniqid()} />
              : <Route path='/' element={<SignIn />} key={uniqid()} />}
            {routes.map(route => <Route path={route.path} element={route.component} key={uniqid()} />)}
          </Routes>
          {!auth.currentUser && <LoginPopup loginPopup={loginPopup} setLoginPopup={setLoginPopup} />}
        </BrowserRouter>
      </LoginPopupContext.Provider>
    </div>
  );
}

export default App;
