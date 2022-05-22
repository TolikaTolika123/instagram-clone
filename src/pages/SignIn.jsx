import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../firebase'
import instagramImg from '../images/instagram.png'

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function HandleLogin(e) {
    e.preventDefault();
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      alert(`Error: ${error}`)
    }
    setLoading(false)
  }

  return (
    <div className='login'>
      <form className='login__form' onSubmit={HandleLogin}>
        <img className='login__logo' src={instagramImg} alt="Instagram" />
        <input
          className='login__input'
          type="email"
          placeholder='Email adress'
          value={email}
          onChange={e => { setEmail(e.target.value) }}
        />
        <input
          className='login__input'
          type="password"
          placeholder='Password'
          value={password}
          onChange={e => { setPassword(e.target.value) }}
        />
        <button className='login__button' disabled={loading || !email || password.length < 6}>Sign In</button>
      </form>
      <div className="login__link">
        <p>do not have account yet? <Link to='/Signup'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default SignIn