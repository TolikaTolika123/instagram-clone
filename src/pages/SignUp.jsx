import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { signUp, auth } from '../firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

import instagramImg from '../images/instagram.png'

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('')

  async function HandleSignUp(e) {
    e.preventDefault();
    setLoading(true)
    try {
      await signUp(email, password)

      const newImageRef = ref(getStorage(), 'images/defaultPfp.jpg');
      const publicImageUrl = await getDownloadURL(newImageRef);
      await updateProfile(auth.currentUser, {
        photoURL: publicImageUrl,
        displayName: fullName
      })

      await setDoc(doc(getFirestore(), "users", auth.currentUser.uid), {
        username
      });
      navigate('/')
    } catch (error) {
      alert(`Error: ${error}`)
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
          value={fullName}
          onChange={e => { setFullName(e.target.value) }}
        />
        <input
          className='login__input'
          type="text"
          placeholder='username'
          value={username}
          onChange={e => { setUsername(e.target.value) }}
        />
        <input
          className='login__input'
          type="password"
          placeholder='Password'
          value={password}
          onChange={e => { setPassword(e.target.value) }}
        />
        <button 
        className='login__button' 
        disabled={loading || !email || !fullName || !username || password.length < 6}
        >
          Sign Up
        </button>
      </form>
      <div className="login__link">
        <p>already have an account ? <Link to='/Login'>Sign In!</Link></p>
      </div>
    </div>
  )
}

export default SignUp