import React, { useState, useEffect } from 'react'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import Header from '../components/Header'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const ProfileEdit = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [user, setUser] = useState({
    followers: [],
    following: [],
    saved: [],
    posts: [],
    publicImageUrl: 'https://www.google.com/images/spin-32.gif?a',
    bio: '',
    username: '',
    fullName: '',
    number: '',
    gender: null
  })
  const [newImg, setNewImg] = useState(user.publicImageUrl)
  const [newFullName, setNewFullName] = useState(user.fullName)
  const [newUsername, setNewUsername] = useState(user.username)
  const [newBio, setNewBio] = useState(user.bio)
  const [newNumber, setNewNumber] = useState(user.number)
  const [newGender, setNewGender] = useState(user.gender)

  const loadUser = async user => {
    if (user) {
      const userRef = doc(getFirestore(), "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data())
      setNewImg(userSnap.data().publicImageUrl)
      setNewFullName(userSnap.data().fullName)
      setNewUsername(userSnap.data().username)
      setNewBio(userSnap.data().bio)
      setNewNumber(userSnap.data().number)
      setNewGender(userSnap.data().gender)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, loadUser)
  }, [])

  const checkForDisabled = () => {
    if (newImg !== user.publicImageUrl
      || newFullName !== user.fullName
      || newUsername !== user.username
      || newBio !== user.bio
      || newNumber !== user.number
      || newGender !== user.gender) {
      return false
    }
    return true
  }

  return (
    <div className="profile__edit" onClick={() => setDropdownVisible(false)}>
      <Header {...{ dropdownVisible, setDropdownVisible }} />
      <div className="container">
        <main className="main profile__edit">
          <div className="profile__edit-inner">
            <form className="profile__edit-form">
              <label className='profile__edit-pfp' htmlFor="pfp">
                <input
                  type="file"
                  id='pfp'
                  value=''
                  onChange={(event) => {
                    event.target.files[0].arrayBuffer().then(buf => {
                      const blob = new Blob([buf], { type: 'image/png' });
                      console.log(URL.createObjectURL(blob))
                      setNewImg(URL.createObjectURL(blob));
                    })
                  }} />
                <div className='profile__edit-pfp-img'>
                  <img src={newImg} alt="pfp" />
                </div>
                <div className="profile__edit-pfp-content">
                  <h1 className="profile__edit-username" onClick={e => e.preventDefault()}>{user.username}</h1>
                  <span>Change Profile Photo</span>
                </div>
              </label>
              <fieldset className='profile__edit-fieldset'>
                <label className='profile__edit-label' htmlFor="name">Name</label>
                <input
                  className='profile__edit-input'
                  type="text"
                  id='name'
                  value={newFullName}
                  onChange={e => setNewFullName(e.target.value)}
                />
              </fieldset>
              <fieldset className='profile__edit-fieldset'>
                <label className='profile__edit-label' htmlFor="username">Username</label>
                <input
                  className='profile__edit-input'
                  type="text"
                  id='username'
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                />
              </fieldset>
              <fieldset className='profile__edit-fieldset'>
                <label className='profile__edit-label' htmlFor="bio">Bio</label>
                <textarea
                  className='profile__edit-input'
                  type="text"
                  id='bio'
                  value={newBio}
                  onChange={e => setNewBio(e.target.value)}
                ></textarea>
              </fieldset>
              <fieldset className='profile__edit-fieldset'>
                <label className='profile__edit-label' htmlFor="phone">Phone Number</label>
                <input
                  className='profile__edit-input'
                  type="number"
                  id='phone'
                  value={newNumber}
                  onChange={e => setNewNumber(e.target.value)}
                />
              </fieldset>
              <fieldset className='profile__edit-fieldset'>
                <p className='profile__edit-label'>Gender</p>
                <div className="profile__edit-radiocontainer">
                  <label htmlFor="male">Male</label>
                  <input
                    className='profile__edit-radiobutton'
                    type="radio"
                    id='male'
                    name='gender'
                    checked={newGender}
                    onChange={e => setNewGender(true)}
                  />
                  <label htmlFor="male">Female</label>
                  <input
                    className='profile__edit-radiobutton'
                    type="radio"
                    id='female'
                    name='gender'
                    checked={newGender === false}
                    onChange={e => setNewGender(false)}
                  />
                </div>
              </fieldset>
              <button className='profile__edit-submit' disabled={checkForDisabled()}>Submit</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileEdit