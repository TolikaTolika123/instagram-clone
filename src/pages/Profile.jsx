import React, { useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import ProfilePosts from '../components/ProfilePosts';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const Profile = () => {
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
  const params = useParams()

  const loadUser = async () => {
    const querySnapshot = await getDocs(collection(getFirestore(), "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().username === params.profile) {
        setUser({ ...doc.data(), id: doc.id })
      }
    });
  }

  useEffect(() => {
    loadUser()
  }, [params.profile])

  return (
    <div className="profile" onClick={() => setDropdownVisible(false)}>
      <Header {...{ dropdownVisible, setDropdownVisible }} />
      <div className="container">
        <main className="main profile">
          <ProfileHeader user={user} />
          <ProfilePosts user={user} active={'posts'} posts={user.posts} />
        </main>
      </div>
    </div>
  )
}

export default Profile