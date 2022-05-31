import React from 'react'
import { Link } from 'react-router-dom'

const LoginPopup = ({ loginPopup, setLoginPopup }) => {
  return (
    <div className={loginPopup ? 'login__popup active' : 'login__popup'} onClick={() => setLoginPopup(false)}>
      <div className="login__popup-content" onClick={e => e.stopPropagation()}>
        <h2 className='login__popup-title'>You can't perform this action</h2>
        <p className='login__popup-text'>
          <span>To perform this action you need to </span>
          <Link to='/'>log in</Link>
          <span> first.</span>
        </p>
      </div>
    </div>
  )
}

export default LoginPopup