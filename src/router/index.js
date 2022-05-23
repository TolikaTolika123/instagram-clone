import SignUp from "../pages/SignUp"
import SignIn from "../pages/SignIn"
import Error from "../pages/Error"
import Home from "../pages/Home"
import Profile from "../pages/Profile"

export const privateRoutes = [
  { path: '/home', component: <Home/> },
  { path: '/', component: <Home/> },
  { path: '/profile/:profile', component: <Profile/> },
  { path: '/*', component: <Error/> },
]

export const publicRoutes = [
  { path: '/Signup', component: <SignUp/> },
  { path: '/Login', component: <SignIn/> },
  { path: '/', component: <SignIn/> },
  { path: '/*', component: <Error/> }
]