import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';


const ProfileEdit = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [messageClass, setMessageClass] = useState('message')

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

  const [newImg, setNewImg] = useState()
  const [newImgUrl, setNewImgUrl] = useState(user.publicImageUrl)
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
      setNewImgUrl(userSnap.data().publicImageUrl)
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
    if (newImgUrl !== user.publicImageUrl
      || newFullName !== user.fullName
      || newUsername !== user.username
      || newBio !== user.bio
      || newNumber !== user.number
      || newGender !== user.gender) {
      return false
    }
    return true
  }

  const submitChanges = async e => {
    e.preventDefault()

    if (newImgUrl !== user.publicImageUrl) {
      // Uploading image to firebase storage
      const filePath = `${auth.currentUser.uid}/pfp/${newImg.name}`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, newImg);

      // Generate a public URL for the file.
      const publicImageUrl = await getDownloadURL(newImageRef);

      // Update profile
      await updateProfile(auth.currentUser, {
        photoURL: publicImageUrl,
      })

      // Update user document
      await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid),
        { publicImageUrl, storageUri: fileSnapshot.metadata.fullPath })

      // return to unchanged values
      setNewImg(undefined)
      setNewImgUrl(user.publicImageUrl)
    }

    if (newFullName !== user.fullName) {
      // update profile
      await updateProfile(auth.currentUser, {
        displayName: newFullName
      })

      // update user document
      await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid), { fullName: newFullName })

      // return to unchanged value
      setNewFullName(user.fullName)
    }

    if (newUsername !== user.username) {
      // update user document
      await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid), { username: newUsername })

      // return to unchanged value
      setNewUsername(user.username)
    }

    if (newBio !== user.bio) {
      // update user document
      await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid), { bio: newBio })

      // return to unchanged value
      setNewBio(user.bio)
    }

    if (newNumber !== user.number) {
      // update user document
      await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid), { number: newNumber })

      // return to unchanged value
      setNewNumber(user.number)
    }

    if (newGender !== user.gender) {
      // update user document
      await updateDoc(doc(getFirestore(), 'users', auth.currentUser.uid), { gender: newGender })

      // return to unchanged value
      setNewGender(user.gender)
    }

    setMessageClass('message active')
    setTimeout(() => {
    setMessageClass('message')
    }, 3000);
  }

  const disableSpace = e => {
    if (e.which === 32) return false;
  }

  return (
    <div className="profile__edit" onClick={() => setDropdownVisible(false)}>
      <Header {...{ dropdownVisible, setDropdownVisible }} />
      <div className="container">
        <main className="main profile__edit">
          <div className="profile__edit-inner">
            <form
              className="profile__edit-form"
              onSubmit={submitChanges}
            >
              <label className='profile__edit-pfp' htmlFor="pfp">
                <input
                  type="file"
                  id='pfp'
                  value=''
                  onChange={(event) => {
                    event.target.files[0].arrayBuffer().then(buf => {
                      const blob = new Blob([buf], { type: 'image/png' });
                      setNewImgUrl(URL.createObjectURL(blob));
                    })
                    setNewImg(event.target.files[0]);
                  }} />
                <div className='profile__edit-pfp-img'>
                  <img src={newImgUrl} alt="pfp" />
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
                  onChange={e => { 
                    e.target.value = e.target.value.replace(/\s/g, "");
                    setNewUsername(e.target.value)
                  }}
                  onKeyDown={disableSpace}
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
              <button
                className='profile__edit-submit'
                disabled={checkForDisabled()}
              >
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
      <div className={messageClass}>
        <span>Profile Updated Successfully</span>
      </div>
    </div>
  )
}

export default ProfileEdit