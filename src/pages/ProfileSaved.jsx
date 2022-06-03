import React, { useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import ProfilePosts from '../components/ProfilePosts';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Header from '../components/Header';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ProfileSaved = () => {
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

  const loadUser = async user => {
    if (user) {
      const userRef = doc(getFirestore(), "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      setUser({...userSnap.data(), id: auth.currentUser.uid})
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, loadUser)
  }, [])

  

  return (
    <div className="profile" onClick={() => setDropdownVisible(false)}>
      <Header {...{ dropdownVisible, setDropdownVisible }} />
      <div className="container">
        <main className="main profile">
          <ProfileHeader user={user} />
          <ProfilePosts user={user} active={'saved'} posts={user.saved} />
        </main>
      </div>
    </div>
  )
}

export default ProfileSaved