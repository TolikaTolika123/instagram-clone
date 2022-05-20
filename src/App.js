import './styles/index.scss'
import { useAuth } from './hooks/useAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './router';
import Header from './components/Header';
import uniqid from 'uniqid'

function App() {
  const currentUser = useAuth();
  return (
    <div className="App">
      {currentUser
        ?
        <BrowserRouter>
          <Header />
          <Routes>
            {privateRoutes.map(route => <Route path={route.path} element={route.component}  key={uniqid()}/>)}
          </Routes>
        </BrowserRouter>
        : <BrowserRouter>
          <Routes>
            {publicRoutes.map(route => <Route path={route.path} element={route.component}  key={uniqid()}/>)}
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
