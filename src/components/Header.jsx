import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';

import instagramImg from '../images/instagram.png'
import loupeImg from '../images/loupe.svg'
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const Header = ({ dropdownVisible, setDropdownVisible }) => {
  const [usersList, setUsersList] = useState([])
  const [searchedUsers, setSearchedUsers] = useState([])
  const [searchedValue, setsearchedValue] = useState('')
  const [searchDropdownVisible, setSearchDropdownVisible] = useState(false)

  const changeSearchedUsers = e => {
    setsearchedValue(e.target.value);
    if (e.target.value === '') {
      setSearchedUsers([])
      setSearchDropdownVisible(false)
    } else {
      setSearchedUsers(usersList.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase())))
      setSearchDropdownVisible(true)
    }
  }

  const loadUsers = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(), "users"));
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      if (!usersList.find(user => user.id === doc.id)) {
        const newUser = { id: doc.id, ...user };
        const prevUsers = usersList;
        prevUsers.push(newUser)
        setUsersList(structuredClone(prevUsers))
      }
    });
  }

  useEffect(() => {
    loadUsers();
  }, [])


  return (
    <header className='header'>
      <div className="container">
        <div className="header__inner">
          <Link className="header__logo" to='/'><img src={instagramImg} alt="Instagram" /></Link>
          <div className="header__search">
            <label htmlFor="header__serach-input">
              <img src={loupeImg} alt="" />
            </label>
            <input
              placeholder='Search'
              type="text"
              className="header__search-input"
              value={searchedValue}
              onChange={changeSearchedUsers}
            />
            <div className={searchDropdownVisible ? "header__search-dropdown active" : "header__search-dropdown"}>
            <ul className="header__search-list">
              {searchedUsers.map(user => (
                <li className='header__search-item' key={user.id}>
                  <Link className='header__search-itemLink' to={`/profile/${user.username}`}>
                    <div className="header__search-itemImg">
                      <img src={user.publicImageUrl} alt="" />
                    </div>
                    <div className="header__search-itemContent">
                      <p className="header__search-itemUsername">{user.username}</p>
                      <p className="header__search-itemFullName">{user.fullName}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          </div>
          <Navbar {...{ dropdownVisible, setDropdownVisible }} />
        </div>
      </div>
    </header>
  )
}

export default Header