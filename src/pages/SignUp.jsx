import React, { useState } from 'react'
import { signUp } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import instagramImg from '../images/instagram.png'

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function HandleSignUp(e) {
    e.preventDefault();
    setLoading(true)
    try {
      await signUp(email, password);
      navigate('/')
    } catch (error) {
      alert('Error')
    }
    setLoading(false)
  }

  return (
    <div className='login'>
      <form className='login__form' onSubmit={HandleSignUp}>
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
          type="text"
          placeholder='Full name'
        />
        <input
          className='login__input'
          type="text"
          placeholder='username'
        />
        <input
          className='login__input'
          type="password"
          placeholder='Password'
          value={password}
          onChange={e => { setPassword(e.target.value) }}
        />
        <button className='login__button' disabled={loading || !email || password.length < 6}>Sign Up</button>
      </form>
      <div className="login__link">
        <p>already have an account ? <Link to='/Login'>Sign In!</Link></p>
      </div>
    </div>
  )
}

export default SignUp