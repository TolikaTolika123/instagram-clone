import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../firebase'

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function HandleLogin(e) {
    e.preventDefault();
    setLoading(true)
    try {
      login(email, password)
      navigate('/')
    } catch (error) {
      alert('Error')
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={HandleLogin}>
        <input type="email" value={email} onChange={e => { setEmail(e.target.value) }} />
        <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} />
        <button disabled={loading}>Sign In</button>
      </form>
      <p>do not have account ? <Link to='/Signup'>Sign Up</Link></p>
    </div>
  )
}

export default SignIn