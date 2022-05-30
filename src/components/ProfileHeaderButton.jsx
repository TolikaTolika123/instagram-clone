import React from 'react'
import { auth } from '../firebase'

const ProfileHeaderButton = ({user}) => {
  if (auth.currentUser.uid === user.id) {
    return (
      <button className='profile__content-btn edit'>Edit Profile</button>
    )
  } else {
    if (user.followers.includes(auth.currentUser.uid)) {
      return (
        <button className='profile__content-btn unfollow'>unfollow</button>
      )
    } else if (!user.followers.includes(auth.currentUser.uid)) {
      return (
        <button className='profile__content-btn unfollow'>follow</button>
      )
    }
  }
}

export default ProfileHeaderButton