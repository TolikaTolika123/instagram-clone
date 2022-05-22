import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { logOut, auth } from '../firebase'
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Header = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleLogOut = async () => {
    setLoading(true)
    try {
      await logOut();
      navigate('/')
    } catch (error) {
      alert('Error')
    }
    setLoading(false)
  }

  const openProfile = async () => {
    const docRef = doc(getFirestore(), 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    navigate(`/profile/${docSnap.data().username}`)
  }
  return (
    <header>
      <button onClick={openProfile}>profile</button>
      <button disabled={loading} onClick={handleLogOut}>sign out</button>
    </header>
  )
}

export default Header