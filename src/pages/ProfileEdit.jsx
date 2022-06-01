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
    fullName: ''
  })
  const [newImg, setNewImg] = useState(user.publicImageUrl)

  const loadUser = async user => {
    if (user) {
      const userRef = doc(getFirestore(), "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data())
      setNewImg(userSnap.data().publicImageUrl)
    }
  }

  function initFirebaseAuth() {
    onAuthStateChanged(auth, loadUser)
  }


  useEffect(() => {
    initFirebaseAuth()
  }, [])

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
                <input className='profile__edit-input' type="text" id='name' />
              </fieldset>
              <fieldset className='profile__edit-fieldset'>
                <label className='profile__edit-label' htmlFor="username">Username</label>
                <input className='profile__edit-input' type="text" id='username' />
              </fieldset>
              <fieldset className='profile__edit-fieldset'>
                <label className='profile__edit-label' htmlFor="bio">Bio</label>
                <textarea className='profile__edit-input' type="text" id='bio'></textarea>
              </fieldset>
              <fieldset className='profile__edit-fieldset'>
                <label className='profile__edit-label' htmlFor="phone">Phone Number</label>
                <input className='profile__edit-input' type="number" id='phone' />
              </fieldset>
              <fieldset className='profile__edit-fieldset'>
                <p className='profile__edit-label'>Gender</p>
                <label htmlFor="male">Male</label>
                <input className='profile__edit-radiobutton' type="radio" id='male' name='gender'/>
                <label htmlFor="male">Female</label>
                <input className='profile__edit-radiobutton' type="radio" id='female' name='gender'/>
              </fieldset>
              <button className='profile__edit-submit'>Submit</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileEdit