import React, { useState } from 'react'
import { logOut } from '../firebase'
import { useNavigate } from 'react-router-dom'

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
  return (
    <header>
      <button disabled={loading} onClick={handleLogOut}>sign out</button>
    </header>
  )
}

export default Header