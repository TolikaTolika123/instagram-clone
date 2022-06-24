import React, { useState, useEffect } from 'react'
import ProfileHeaderButton from './ProfileHeaderButton'

const ProfileHeader = ({ user }) => {
  const [followers, setFollowers] = useState(user.followers)

  useEffect(() => {
    setFollowers(user.followers)
  }, [user])

  return (
    <div className='profile__header'>
      <div className="profile__picture">
        <img src={user.publicImageUrl} alt="" />
      </div>
      <div className="profile__content">
        <div className="profile__content-top">
          <h2 className="profile__username">{user.username}</h2>
          <ProfileHeaderButton {...{ user, followers, setFollowers }} />
        </div>
        <p className="profile__stats">
          <span className="profile__stats-item">
            <b className="profile__stats-num">{user.posts.length}</b> posts
          </span>
          <span className="profile__stats-item">
            <b className="profile__stats-num">{followers.length}</b> followers
          </span>
          <span className="profile__stats-item">
            <b className="profile__stats-num">{user.following.length}</b> following
          </span>
        </p>
        <p className="profile__fullName">{user.fullName}</p>
        <p className="profile__bio">{user.bio}</p>
      </div>
    </div>
  )
}

export default ProfileHeader