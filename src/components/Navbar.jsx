import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { auth, logOut } from '../firebase'

import homeImg from '../images/home.svg'
import plusImg from '../images/plus.svg'
import profileImg from '../images/profile.svg'
import savedImg from '../images/saved.svg'

const Navbar = ({ dropdownVisible, setDropdownVisible }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [pfp, setPfp] = useState('')

  useEffect(() => {
    loadPfp()
  }, [])

  const loadPfp = async () => {
    const pfp = auth.currentUser.photoURL;
    setPfp(pfp)
  }

  const openProfile = async () => {
    const docRef = doc(getFirestore(), 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    navigate(`/profile/${docSnap.data().username}`)
  }

  const toggleDropdown = e => {
    e.stopPropagation();
    setDropdownVisible(prev => !prev)
  }

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
    <nav className='nav'>
      <ul className="nav__list">
        <li className="nav__item">
          <Link to='/'>
            <img src={homeImg} alt="Homepage" />
          </Link>
        </li>
        <li className="nav__item">
          <button>
            <img src={plusImg} alt="Add post" />
          </button>
        </li>
        <li className="nav__item">
          <div className={dropdownVisible ? 'header__dropdown active' : 'header__dropdown'}>
            <div className="header__dropdown-btn" onClick={toggleDropdown}>
              <img src={pfp} alt="" />
            </div>
            <div className="header__dropdown-content">
              <ul className="header__dropdown-options">
                <li className="header__dropdown-option">
                  <button onClick={openProfile}>
                    <img src={profileImg} alt="" />
                    <span>Profile</span>
                  </button>
                </li>
                <li className="header__dropdown-option">
                  <button>
                    <img src={savedImg} alt="" />
                    <span>Saved</span>
                  </button>
                </li>
              </ul>
              <button className='header__dropdown-logout' disabled={loading} onClick={handleLogOut}>Sign out</button>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar