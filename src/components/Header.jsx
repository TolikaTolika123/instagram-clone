import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';

import instagramImg from '../images/instagram.png'
import loupeImg from '../images/loupe.svg'


const Header = ({dropdownVisible, setDropdownVisible}) => {
  
  return (
    <header className='header'>
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo" to='/'><img src={instagramImg} alt="Instagram" /></Link>
          <div className="header__search">
            <label htmlFor="header__serach-input">
              <img src={loupeImg} alt="" />
            </label>
            <input placeholder='Search' type="text" className="header__search-input" id="header__search-input" list='header__search-results' />
            <datalist id="header__search-results">
              <option value="Edge" />
              <option value="Firefox" />
              <option value="Chrome" />
              <option value="Opera" />
              <option value="Safari" />
            </datalist>
          </div>
          <Navbar {...{dropdownVisible, setDropdownVisible}}/>
        </div>
      </div>
    </header>
  )
}

export default Header