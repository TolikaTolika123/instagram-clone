import SignUp from "../pages/SignUp"
import SignIn from "../pages/SignIn"
import Error from "../pages/Error"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import ProfileSaved from "../pages/ProfileSaved"
import PostPage from "../pages/PostPage"

export const routes = [
  { path: '/signup', component: <SignUp/> },
  { path: '/login', component: <SignIn/> },
  { path: '/home', component: <Home/> },
  { path: '/profile/:profile', component: <Profile/> },
  { path: '/post/:post', component: <PostPage/> },
  { path: '/*', component: <Error/> }
]