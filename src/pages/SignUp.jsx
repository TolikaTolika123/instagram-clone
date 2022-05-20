import React, { useState } from 'react'
import { signUp } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <form onSubmit={HandleSignUp}>
        <input type="email" value={email} onChange={e => { setEmail(e.target.value) }} />
        <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} />
        <button disabled={loading}>Sign Up</button>
      </form>
      <p>
        already have an account ? <Link to='/Login'>Sign In!</Link>
      </p>
    </div>
  )
}

export default SignUp